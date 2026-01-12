/**
 This Scrtpt file is developed by
Aditya Kameswara Rao Nandula
Senior Project Scientist,
Virtual Labs IIT Kharagpur.
LinkedIn: https://in.linkedin.com/in/akraonandula/
 */

import * as THREE from 'three' ;

import { STLLoader } from 'three/addons/loaders/STLLoader.js';

import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import WebGL from 'three/addons/capabilities/WebGL.js';


function aditya1(){
const mn=0.0001;
const mx=100;
var mldme, trnme;
const sizs={
    wd:window.innerWidth*1.75,
    ht:window.innerHeight*1.75
};
let l=(sizs.wd / sizs.ht /1000).toFixed(4);
let b=(sizs.wd / sizs.ht /1000).toFixed(4);
let h=(sizs.wd / sizs.ht /1000).toFixed(4);
window.addEventListener("resize",()=>{
    rndr.setSize(sizs.wd, sizs.ht, mn, mx);
    $("#wes1").animate({
        width:sizs.wd,
        height:sizs.ht
    },1);
    window.location.reload();
});
const stldr = new STLLoader();
const scn=new THREE.Scene();
const lgt=new THREE.PointLight(0xffffff, mn, mx);
lgt.position.set(20, 20, 20);
const cam=new THREE.PerspectiveCamera(45, sizs.wd / sizs.ht, mn, mx);
cam.position.set(0,-2,2);
scn.add(cam);            
scn.add(lgt);

const cnvs= document.querySelector("#wes");
const rndr=new THREE.WebGLRenderer({canvas:cnvs});

rndr.setSize(sizs.wd, sizs.ht, mn, mx);
rndr.render(scn,cam);

let ml='./images/buv/mld.stl';
stldr.load(ml, function ( mld ) {
    const mldma = new THREE.MeshMatcapMaterial( { opacity: mld.alpha, vertexColors: true } );
    mldme = new THREE.Mesh( mld, mldma );
	scn.add( mldme );
    mldme.rotation.set( -Math.PI / 2, Math.PI, Math.PI/2*0 );
    mldme.position.set( -sizs.wd / sizs.ht*0.0 , -sizs.wd / sizs.ht*0.0, -sizs.wd / sizs.ht*0.0 );
    mldme.scale.set(sizs.wd / sizs.ht*0.01 , sizs.wd / sizs.ht*0.01, sizs.wd / sizs.ht*0.01 );
    mldme.castShadow = true;
    mldme.receiveShadow = true;

}, undefined, function ( error ) {

	console.error( error );

} );
scn.add(mldme);
rndr.render(scn,cam);

const tr='./images/buv/trnu.stl';
stldr.load(tr, function ( trn ) {
    const trnma = new THREE.MeshMatcapMaterial( { opacity: trn.alpha, vertexColors: true } );
    trnme = new THREE.Mesh( trn, trnma );
	scn.add( trnme );
    trnme.rotation.set( Math.PI, Math.PI, Math.PI/2 );
    trnme.position.set(-sizs.wd / sizs.ht*0.041, -sizs.wd / sizs.ht*0.23, -sizs.wd / sizs.ht*0.68);
    trnme.scale.set(l*3.0,b*3.0,h*3.0 );
    trnme.castShadow = true;
    trnme.receiveShadow = true;

}, undefined, function ( error ) {

	console.error( error );

} );


const wr = new THREE.CylinderGeometry(1,1,3,15);
const wrm = new THREE.MeshMatcapMaterial( {color: '#5a6977'} );
const wrv = new THREE.Mesh( wr, wrm );
wrv.rotation.set( Math.PI/8*0, Math.PI/12*0, Math.PI/12*1);
wrv.position.set(sizs.wd / sizs.ht*0.05, -sizs.wd / sizs.ht*0.22, sizs.wd / sizs.ht*0.0);
wrv.scale.set(l*20,b*150,h*10.0);
scn.add(wrv);

let wbv = new THREE.Shape();
wbv.moveTo( 0,0 );
wbv.lineTo( ((sizs.wd / sizs.ht)/12).toFixed(3), 0 );
wbv.lineTo( (sizs.wd / sizs.ht+0.45).toFixed(3), (sizs.wd / sizs.ht+0.45).toFixed(3));
wbv.lineTo(-(sizs.wd / sizs.ht+0.45).toFixed(3), (sizs.wd / sizs.ht+0.45).toFixed(3));
wbv.lineTo(-((sizs.wd / sizs.ht)/12).toFixed(3), 0 );
wbv.lineTo(0, 0);
wbv.closed=true;
var extset = {
	steps: 0,
	depth: 0,
	bevelEnabled: false,    
};

const gmtf = new THREE.ExtrudeGeometry( wbv, extset );
const matf = new THREE.MeshBasicMaterial( { color: 0x404040, wireframe: false, side: THREE.DoubleSide } );
const fill = new THREE.Mesh( gmtf, matf );
fill.rotation.set( Math.PI/2*0, -Math.PI/2*0, Math.PI);
fill.position.set(-sizs.wd / sizs.ht*0.005, -sizs.wd / sizs.ht*0.00, sizs.wd / sizs.ht*0.0);
fill.scale.set(((sizs.wd / sizs.ht)*0.026).toFixed(4),((sizs.wd / sizs.ht)*0.042).toFixed(4),((sizs.wd / sizs.ht)*0.12).toFixed(4));
scn.add( fill );

const lstnr = new THREE.AudioListener();
cam.add(lstnr);
const aud = new THREE.Audio(lstnr);
const adldr = new THREE.AudioLoader();
adldr.load('./images/Wldsd.mp3', (buffer) => {
    aud.setBuffer(buffer);
});


const adit = () => {
            aud.playbackRate = 2.0;
                aud.play();
                setTimeout(() => {
                    aud.stop();
                }, 100);
        };
function lblupd(objprt,sprt,arw,upof){
    if (!objprt || !sprt || !arw) return;
        const lblps = objprt.position.clone().add(upof);
        sprt.position.copy(lblps);
        arw.position.copy(lblps);
}

let actLabelSprite = null;
let actArrow = null;

function crtlbl(text,fnt) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    ctx.font =  fnt+'px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
}

function crtar(objprt,objnm) {
    if (!objprt) return;
    const nameText = objnm;
    const tex = crtlbl(nameText,23);
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
    actLabelSprite = new THREE.Sprite(mat);

    const upOffset = new THREE.Vector3(0, (sizs.wd / sizs.ht) * 0.45, 0);
    actLabelSprite.position.copy(objprt.position).add(upOffset);

    const baseScale = (sizs.wd / sizs.ht) * 0.8;
    actLabelSprite.scale.set(baseScale * 2.2, baseScale * 0.6, 1);

    scn.add(actLabelSprite);

    const dir = new THREE.Vector3().subVectors(objprt.position, actLabelSprite.position).normalize();
    const length = actLabelSprite.position.distanceTo(objprt.position);
    const headLength = (sizs.wd / sizs.ht) * 0.03;
    const headWidth = (sizs.wd / sizs.ht) * 0.15;
    actArrow = new THREE.ArrowHelper(dir, actLabelSprite.position.clone(), length, 0xffcc00, headLength, headWidth);
    scn.add(actArrow);

    return [actLabelSprite, actArrow];
}


let bslbl = null;

const bsmtlbl = setInterval(() => {
    if (!mldme) return;
    if (bslbl) return;
    const lbar=crtar(mldme,"Base material");
    bslbl=lbar[0];
    if (lbar[0] &&  lbar[1]) {
        const upOffset = new THREE.Vector3((sizs.wd / sizs.ht) *-0.05, (sizs.wd / sizs.ht) * 0.25, -(sizs.wd / sizs.ht) *0.25);
        const labelPos = mldme.position.clone().add(upOffset);
        lbar[0].position.copy(labelPos);
        const dir = new THREE.Vector3().subVectors(mldme.position, labelPos).normalize();
        const length = labelPos.distanceTo(mldme.position);
        lbar[1].position.copy(labelPos);
        //lbar[1].setDirection(dir);
        lbar[1].setLength(length*0.72, (sizs.wd / sizs.ht) * 0.03, (sizs.wd / sizs.ht) * 0.02);
    }
}, 100);

let ecblsprt = null;
let ecblarw = null;
let ecblof = null;

const eclbl = setInterval(() => {
    if (!trnme) return;
    if (ecblsprt || ecblarw) {return;}
    else
    {const lbar=crtar(trnme,"Welding torch");
    ecblsprt=lbar[0];
    ecblarw=lbar[1];
    if (lbar[0] &&  lbar[1]) {
        let upOffset = new THREE.Vector3((sizs.wd / sizs.ht)*0.035, -(sizs.wd / sizs.ht) * 0.35, -(sizs.wd / sizs.ht)*0.00);
        ecblof=upOffset;
        let labelPos = trnme.position.clone().add(upOffset);
        lbar[0].position.copy(labelPos);
        let dir = new THREE.Vector3(Math.PI/2*0,-Math.PI/2*0,0).normalize();
        let length = labelPos.distanceTo(trnme.position);
        lbar[1].position.copy(labelPos);
        lbar[1].setDirection(dir);
        lbar[1].setLength(length*0.65, (sizs.wd / sizs.ht) * 0.03, (sizs.wd / sizs.ht) * 0.02);
    }}
}, 10);



window.addEventListener('beforeunload', () => {
    clearInterval(bsmtlbl);
    clearInterval(eclbl);
});



const ctr = new OrbitControls(cam, cnvs);
let i=0,j=0, adi=0, k=sizs.wd / sizs.ht*0.0011, m=sizs.wd / sizs.ht*0.0019;


const loop = () => {

    rndr.render(scn,cam);
    window.requestAnimationFrame(loop);
    
   if(i<= ((sizs.wd / sizs.ht)*0.585)){
        adit();
        trnme.position.set(-sizs.wd / sizs.ht*0.041, -sizs.wd / sizs.ht*0.23, -sizs.wd / sizs.ht*0.68-m);
        lblupd(trnme,ecblsprt,ecblarw,ecblof);

        rndr.render(scn,cam);
        k+=sizs.wd / sizs.ht*0.0011;
        m+=sizs.wd / sizs.ht*0.00195;    
    
        wrv.position.x -=sizs.wd / sizs.ht*0.000055;
        wrv.position.y -=sizs.wd / sizs.ht*0.000005;
        wrv.position.z -=sizs.wd / sizs.ht*0.0018;
        wrv.scale.set(l*20,b*150-i/8,h*10.0);
        i+=sizs.wd / sizs.ht*0.001455;
        extset = {
            steps: j,
            depth: -j/100,
            bevelEnabled: false
        };
        
        fill.geometry= new THREE.ExtrudeGeometry( wbv, extset );
        j=j+1.65;
        console.clear();
        rndr.render(scn,cam);
        }
    else {
            if(adi==0){
                scn.remove(mldme);
                scn.remove(trnme);
                scn.remove(wrv);
                scn.remove(fill);
                scn.remove(eclbl);
                ml='./images/buv/mswb.stl';
                stldr.load(ml, function ( mld ) {
                const mldma = new THREE.MeshMatcapMaterial( { opacity: mld.alpha, vertexColors: true } );
                mldme = new THREE.Mesh( mld, mldma );
                scn.add( mldme );
                mldme.rotation.set( -Math.PI / 2, Math.PI, Math.PI/2*0 );
                mldme.position.set( -sizs.wd / sizs.ht*0.0 , -sizs.wd / sizs.ht*0.0, -sizs.wd / sizs.ht*0.0 );
                mldme.scale.set(sizs.wd / sizs.ht*0.01 , sizs.wd / sizs.ht*0.01, sizs.wd / sizs.ht*0.01 );
                mldme.castShadow = true;
                mldme.receiveShadow = true;

            }, undefined, function ( error ) {

                console.error( error );

                } );
                const tr='./images/buv/trh.stl';
                stldr.load(tr, function ( trn ) {
                const trnma = new THREE.MeshMatcapMaterial( { opacity: trn.alpha, vertexColors: true } );
                trnme = new THREE.Mesh( trn, trnma );
                scn.add( trnme );
                trnme.rotation.set( Math.PI, Math.PI, Math.PI/2 );
                trnme.position.set(-sizs.wd / sizs.ht*0.041, -sizs.wd / sizs.ht*0.23, -sizs.wd / sizs.ht*0.68);
                trnme.scale.set(l*3.0,b*3.0,h*3.0 );
                trnme.castShadow = true;
                trnme.receiveShadow = true;
                    lblupd(trnme,ecblsprt,ecblarw,ecblof); 
            }, undefined, function ( error ) {

                console.error( error );

                } ); 
                
                console.clear();
                adi=adi+1;
            }
        }
   
    }
    loop();
    }



    $(document).ready(()=>{
    
        if ( WebGL.isWebGL2Available() ) {

            aditya1();
        
        } else {
        
            const warning = WebGL.getWebGLErrorMessage();
            document.getElementById( 'war' ).appendChild( warning );
        
        }
        

    
    });