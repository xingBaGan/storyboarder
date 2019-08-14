/**
 Based on THREE.SkeletonHelper

 * @author Sean Griffin / http://twitter.com/sgrif
 * @author Michael Guerrero / http://realitymeltdown.com
 * @author mrdoob / http://mrdoob.com/
 * @author ikerr / http://verold.com
 * @author Mugen87 / https://github.com/Mugen87
 */

// REFERENCE
// Animation Bounding Boxes:
// - https://jsfiddle.net/fnjkeg9x/1/
// - https://discourse.threejs.org/t/object-bounds-not-updated-with-animation/3749/12

const THREE = require('three')
require('three/examples/js/utils/BufferGeometryUtils');

// const ModelLoader = require('../services/model-loader')

// const {
  
//   createPosePreset,
  
// } = require('../shared/reducers/shot-generator')
const { Matrix4 } = THREE
const { Vector3 } = THREE
const { Vector4 } = THREE
const { Object3D } = THREE
const { SkinnedMesh } = THREE
const getVertexForBones = ( bufferPositions, bufferSkinIndices, bufferSkinWeights ) => {
    
  let bonesInfluenceVertices = []
  
  for ( var i = 0; i < bufferSkinIndices.count; i++ ) {
    let boneIndex = new Vector4()
    let vertex = new Vector3()
    let vertWeight = new Vector4()

    vertex.fromBufferAttribute( bufferPositions, i )
    boneIndex.fromBufferAttribute( bufferSkinIndices, i )
    vertWeight.fromBufferAttribute( bufferSkinWeights, i )
    
    if (vertWeight.x > 0.01 ) {
      if (bonesInfluenceVertices[boneIndex.x] ) {
        bonesInfluenceVertices[boneIndex.x].push( 
          {
            vertex,
            weight: vertWeight.x     
          })
      } else {
        bonesInfluenceVertices[boneIndex.x] = [{
          vertex,
          weight: vertWeight.x     
        }]
      }
    }

    if (vertWeight.y > 0.01) {
      if (bonesInfluenceVertices[boneIndex.y]) {
        bonesInfluenceVertices[boneIndex.y].push( {
          vertex,
          weight: vertWeight.y     
        } )
      } else {
        bonesInfluenceVertices[boneIndex.y] = [{
          vertex,
          weight: vertWeight.x     
        }]      
      }
    }

    if (vertWeight.z > 0.01) {
      if (bonesInfluenceVertices[boneIndex.z]) {
        bonesInfluenceVertices[boneIndex.z].push( {
          vertex,
          weight: vertWeight.z     
        } )
      } else {
        bonesInfluenceVertices[boneIndex.z] = [{
          vertex,
          weight: vertWeight.z     
        }]      
      }
    }

    if (vertWeight.w > 0.01) {
      if (bonesInfluenceVertices[boneIndex.w]) {
        bonesInfluenceVertices[boneIndex.w].push( {
          vertex,
          weight: vertWeight.w     
        } )
      } else {
        bonesInfluenceVertices[boneIndex.w] = [{
          vertex,
          weight: vertWeight.w     
        }]      
      }
    }

  }
  return bonesInfluenceVertices  
}

function getBoneList( object ) {
  var boneList = []

  if ( object && object.isBone ) {
    boneList.push( object )
  }

  for ( var i = 0; i < object.children.length; i ++ ) {
    boneList.push.apply( boneList, getBoneList( object.children[ i ] ) )
  }

  return boneList
}

let cache = {}

function BonesHelper( object, object3D, { boneLengthScale = 1, cacheKey } ) {

  Object3D.call( this )
  console.log("Create boneshelper");
  //ModelLoader.isCustomModel(model)
  let sknMesh = object3D.children.find(child => child instanceof THREE.SkinnedMesh) ||
    object3D.children[0].children.find(child => child instanceof THREE.SkinnedMesh)
  

  // console.log('new BonesHelper', 'cacheKey:', cacheKey)
  let skeleton_clone
  if (!cache[cacheKey]) {
    console.log('adding to cache', cacheKey)
    cache[cacheKey] = object3D;//cloneSkinned( object3D )
  }
  skeleton_clone = cache[cacheKey]

  let zeroedSkinnedMesh = skeleton_clone.children.find(child => child instanceof THREE.SkinnedMesh) ||
    skeleton_clone.children[0].children.find(child => child instanceof THREE.SkinnedMesh)
  
  zeroedSkinnedMesh.skeleton.pose()

  //sknMesh.savePose(createPosePreset)
  sknMesh.savePose(zeroedSkinnedMesh)
  
  let skinIndex = sknMesh.geometry.attributes.skinIndex
  let vertexPositions = sknMesh.geometry.attributes.position
  let skinWeights = sknMesh.geometry.attributes.skinWeight

  let vertexDistanceMyltiplyFactor = 1
  var bbox = new THREE.Box3().setFromObject(object3D);
  let height = bbox.max.y - bbox.min.y
  if (height>2) vertexDistanceMyltiplyFactor = height * 10
  let bones = getBoneList( object );
  let cones = []
  this.conesGroup = new THREE.Group();
  this.bonesCones = {};
  //this.hit_meshes = []

  let boneMatrix = new Matrix4()
  let matrixWorldInv = new Matrix4()
  let boneCounter = 0
  matrixWorldInv.getInverse( object.matrixWorld )
  
  let bonesContainingVerts = getVertexForBones(vertexPositions, skinIndex, skinWeights, vertexDistanceMyltiplyFactor)
  let traversedBones = []


  let s_material = new THREE.MeshBasicMaterial({
    color:0x7a72e9,
    depthTest: false,
    depthWrite: false,
    transparent: true,
    opacity: 0.9,
    flatShading: true,
    //vertexColors: THREE.VertexColors,
  })
  let geometries = [];
  // If matrix scale is not 1, 1, 1 colliders and bones appear massive
  object.matrixWorld.makeScale(1, 1, 1)
  const color = new THREE.Color(0x7a72e9);
  for (var ii = 0; ii< bones.length; ii++) {
    var bone = bones[ii]

    var jj = 0
    let posA = new Vector3()
    let posB = new Vector3()
    let scaleC = new Vector3()
    
    while (bone.children && bone.children[jj] && bone.children[jj].isBone  )
    {
     
      if (traversedBones.includes(bone)) {

        let currentCreated = traversedBones[traversedBones.indexOf(bone)]
        this.remove(currentCreated)
        //currentCreated.dispose();
        traversedBones[traversedBones.indexOf(bone)] = bone
      }
      else {
        traversedBones.push(bone)
      }

      let boneIndex = traversedBones.indexOf(bone)

      scaleC.setFromMatrixScale(object.matrixWorld)

      posA.setFromMatrixPosition(boneMatrix.multiplyMatrices(matrixWorldInv, bone.matrixWorld))
      posB.setFromMatrixPosition(boneMatrix.multiplyMatrices(matrixWorldInv, bone.children[jj].matrixWorld))

      let boneLength = posA.distanceTo(posB) * scaleC.y
      let boneWidth

      boneWidth = boneLength * boneLengthScale > 0.15 ? boneLength : 0.15 / boneLengthScale   //restrict minimum width
      if (boneLength * boneLengthScale > 0.35) boneWidth = 0.35 / boneLengthScale //also maximum..
      

    
      let geometry = new THREE.CylinderBufferGeometry(boneWidth / 25, boneWidth /15 , boneLength - boneWidth/20, 4 )//, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)

      //geometries.push(geometry);
      // compute a color
      //const hue = THREE.Math.lerp(0.7, 0.3, amount);
      //const saturation = 1;
      //const lightness = THREE.Math.lerp(0.4, 1.0, amount);
      //color.setHSL(hue, saturation, lightness);
      // get the colors as an array of values from 0 to 255
  /*     const rgb = color.toArray().map(v => v * 255);

      // make an array to store colors for each vertex
      const numVerts = geometry.getAttribute('position').count;
      const itemSize = 3;  // r, g, b
      const colors = new Uint8Array(itemSize * numVerts);

      // copy the color into the colors array for each vertex
      colors.forEach((v, ndx) => {
        colors[ndx] = rgb[ndx % 3];
      });
    
      const normalized = true;
      const colorAttrib = new THREE.BufferAttribute(colors, itemSize, normalized);
      
      geometry.addAttribute('color', colorAttrib);
 */
      // secondary geometry used for hit testing
      if (bone.name === 'Head') boneLength *= 1.5

      cones[boneIndex] = new THREE.Mesh( geometry, s_material.clone() )

      cones[boneIndex].geometry.applyMatrix(new Matrix4().makeTranslation(0, boneLength/2+boneWidth/60, 0))

      cones[boneIndex].userData.name = bone.name
      cones[boneIndex].userData.type = 'bone'
      cones[boneIndex].userData.bone = bone.uuid
      cones[boneIndex].userData.segment = 0

      cones.matrixAutoUpdate = false;

      if (boneLength>0)
      {
        boneCounter++
      }

      jj++
    }
  
    let boneIndex = traversedBones.indexOf(bone)
    let cone = cones[boneIndex];
    if(cone)
    {
      this.bonesCones[bone.uuid] = {cone:cone, bone:bone};
      this.conesGroup.add(cone);
      bone.connectedBone = cone;
      bone.updateCone = updateCone;
    }
  }
 /*  const mergedGeometry = THREE.BufferGeometryUtils.mergeBufferGeometries(
    geometries, false); */
  ///const material = new THREE.MeshBasicMaterial({color:'red'});
  //const mesh = new THREE.Mesh(mergedGeometry, s_material);
  //scene.add(mesh);
  //this.conesGroup.add(mesh);
  zeroedSkinnedMesh = null
  
  this.root = object
  this.bones = bones
  //if (sknMesh.needsRepose) sknMesh.repose()
  this.matrix = object.matrixWorld
  this.matrixAutoUpdate = false
  this.needsUpdate = true;
}

function CreateColorAttribut()
{

}

var boneMatrix = new Matrix4();
var matrixWorldInv = new Matrix4();
function updateCone()
{
  return;
  var bone = this
  let connectedBone = bone.connectedBone;
  if(!connectedBone)
  return;
  let bonesHelper = connectedBone.parent.parent;
  matrixWorldInv.getInverse( bonesHelper.root.matrixWorld )
  boneMatrix.multiplyMatrices( matrixWorldInv, bone.matrixWorld )   // changed to parent position, as that's the length calculated

  connectedBone.position.setFromMatrixPosition( boneMatrix )
  connectedBone.quaternion.setFromRotationMatrix( boneMatrix )
  connectedBone.scale.setFromMatrixScale( boneMatrix )
  //connectedBone.updateMatrixWorld(true);
}



BonesHelper.prototype = Object.create( Object3D.prototype )
BonesHelper.prototype.constructor = BonesHelper

BonesHelper.prototype.updateMatrixWorld = function () {
  var boneMatrix = new Matrix4()
  var matrixWorldInv = new Matrix4()
  
  return function updateMatrixWorld( force ) {
    //if(!this.needsUpdate)
      //return;
    if(!this.conesGroup.parent)
    {
      return;
    } 
    this.needsUpdate = false;
    var bones = this.bones
    matrixWorldInv.getInverse( this.root.matrixWorld )

    for ( var ii = 0; ii < bones.length; ii++ )
    {
      var bone = bones [ii]
      boneMatrix.multiplyMatrices( matrixWorldInv, bone.matrixWorld )   // changed to parent position, as that's the length calculated
    
      if (bone.connectedBone === undefined) continue
    
      bone.connectedBone.position.setFromMatrixPosition( boneMatrix )
      bone.connectedBone.quaternion.setFromRotationMatrix( boneMatrix )
      bone.connectedBone.scale.setFromMatrixScale( boneMatrix )
    
    }
    
    Object3D.prototype.updateMatrixWorld.call( this, force )
  }
}() 

BonesHelper.prototype.raycast = function ( raycaster, intersects ) {
  let results = raycaster.intersectObjects(this.conesGroup.children)
  for (let result of results) {
    // add a .bone key to the Intersection object referencing the cone's bone
    result.bone = this.bonesCones[result.object.userData.bone].bone;
    intersects.push(result)
  }
}

const parallelTraverse = ( a, b, callback ) => {
  callback( a, b )
  for ( var i = 0; i < a.children.length; i ++ ) {
    parallelTraverse( a.children[ i ], b.children[ i ], callback )
  }
}

const getDefaultRotationForBone = (skeleton, bone) => {
  return { x: bone.rotation.x, y: bone.rotation.y, z: bone.rotation.z}  
}

SkinnedMesh.prototype.savePose = function(sknMesh) {
  let poseSkeleton = {}
  
  // sknMesh.skeleton.pose()
  this.needsRepose = false

  for (var i = 0; i< this.skeleton.bones.length; i++)
  { 
    this.skeleton.bones[i].updateMatrix()
    sknMesh.skeleton.bones[i].updateMatrix()
    let defaultRotation = getDefaultRotationForBone(this.skeleton, this.skeleton.bones[i])
    let zeroRotation = getDefaultRotationForBone(sknMesh.skeleton, sknMesh.skeleton.bones[i])
    
    //calculating initial rotation vs default rotation difference
    let rotDiff = {
      x: defaultRotation.x - zeroRotation.x,
      y: defaultRotation.y - zeroRotation.y,
      z: defaultRotation.z - zeroRotation.z
    }

    if ( rotDiff.x < -0.0001 || rotDiff.x > 0.0001 ||
      rotDiff.y < -0.0001 || rotDiff.y > 0.0001 ||
      rotDiff.z < -0.0001 || rotDiff.z > 0.0001 )
      {
        this.needsRepose = true
        poseSkeleton[this.skeleton.bones[i].name] = {
          rotation: {
            x: defaultRotation.x,
            y: defaultRotation.y,
            z: defaultRotation.z
          }          
        }        
      }
  }

  if ( this.needsRepose ) {
    this.userData.initialSkeleton = poseSkeleton
  }
  //REMOVED SAVING 

  // let preset = {
  //   id: this.parent.userData.id,
  //   name: this.name,
  //   state: {
  //     skeleton: poseSkeleton || {}
  //   }
  // }
  // //console.log('saving: ', preset)
  // createPosePreset(preset)
}

SkinnedMesh.prototype.repose = function() {
  //console.log('reposing ', this.skeleton.bones, ' to: ', this.userData.initialSkeleton)
  for (var i = 0; i< this.skeleton.bones.length; i++)
  {    
    if (this.userData.initialSkeleton[this.skeleton.bones[i].name])
    {
      this.skeleton.bones[i].rotation.x = this.userData.initialSkeleton[this.skeleton.bones[i].name].rotation.x
      this.skeleton.bones[i].rotation.y = this.userData.initialSkeleton[this.skeleton.bones[i].name].rotation.y
      this.skeleton.bones[i].rotation.z = this.userData.initialSkeleton[this.skeleton.bones[i].name].rotation.z
    }   
  }
  
}

module.exports = BonesHelper
