import * as THREE from '../api/three/three.min'
import { OBJLoader } from '../api/three/jsm/loaders/OBJLoader.js';
import { OrbitControls } from '../api/three/jsm/controls/OrbitControls'
import {ModalCache} from "../api/ModalCache";
import {ImgPathUtils} from "../api/utils/ImgPathUtils";
import {WXUtils} from "../api/utils/WXUtils";

const RESOURCE_URL = 'https://cdn.zhisonggang.com/threejs/examples/models/obj/cerberus/'

const { pixelRatio, } = wx.getSystemInfoSync();
let canvas, scene, renderer, camera, controls;
let cube;

export default (_canvas, id, width, height) => {
    canvas = _canvas;

    //console.log(pixelRatio)

    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;

    // 适配点击事件
    canvas.clientHeight = canvas.height
    canvas.clientWidth = canvas.width;

    // 防止threejs报错，本意是修改canvas的style上的属性，即视图窗口大小
    canvas.style = {}
    canvas.style.width = width * pixelRatio;
    canvas.style.height = height * pixelRatio;

    initRenender(); // 初始化渲染器
    initCamera(); // 初始化相机
    initScene(); // 初始化场景
    initControl(); // 初始化控制器
    initLight(); // 初始化光线
    initGeometrys() // 初始化物体

    /**
     * 初始化渲染器
     */
    function initRenender() {
        renderer = new THREE.WebGLRenderer({
            canvas,
        });
        renderer.setClearColor(0x000000, 1)
        renderer.outputEncoding = THREE.sRGBEncoding; //
        renderer.toneMapping = THREE.ReinhardToneMapping; // 色彩映射
        renderer.toneMappingExposure = 3; // 色调映射的曝光级别
    }

    /**
     * 初始化相机
     */
    function initCamera() {
        camera = new THREE.PerspectiveCamera(
            60,
            canvas.width / canvas.height,
            1,
            1000
        );
        const length = 40;
        camera.position.set(1 * length, 1 * length, 1 * length);
        camera.lookAt(0,0,0);
    }

    /**
     * 初始化场景
     */
    function initScene() {
        scene = new THREE.Scene();
    }

    /**
     * 渲染控制器
     */
    function initControl() {
        controls = new OrbitControls(camera, renderer.domElement);
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.3;
        controls.enableRotate = false;
    }

    async function initGeometrys() {
        const material = new THREE.MeshStandardMaterial();
        //b5333420b52e413f9966ae28e1d103f4
        // console.log(id)
        // const model = await ModalCache.getModel(ImgPathUtils.getMedia(id), id);
        // console.log(model)

        // const downloadFile = await WXUtils.runner(wx.downloadFile, {
        //     url: ImgPathUtils.getMedia(id),
        // })
        // console.log(downloadFile, ImgPathUtils.getMedia(id))
        // if (downloadFile.statusCode == 200) {
        //     console.log(downloadFile)
        // }

        // wx.downloadFile({
        //     url: ImgPathUtils.getMedia(id),
        //     success: function (res) {
        //         //console.log(res.tempFilePath)
        //         //把路径传过去
        //         const fs = wx.getFileSystemManager()
        //         fs.unzip({
        //             zipFilePath: res.tempFilePath,
        //             targetPath: `${wx.env.USER_DATA_PATH}`,
        //             success: function (res) {
        //                 //console.log(`${wx.env.USER_DATA_PATH}`)
        //                 //console.log(res)
        //                 //解压成功之后读取文件
        //                 that.readdir()
        //             },
        //             fail: function ({ errMsg }) {
        //                 //console.log('fail, err is:', errMsg)},
        //             complete: function () { }
        //         })
        //     },
        //     fail: function ({ errMsg }) {
        //         //console.log('downloadFile fail, err is:', errMsg)
        //     },
        //     complete: function () { }
        // })

        let obj = ImgPathUtils.getObj(id);
        console.log(obj)
        let jpg = ImgPathUtils.getJpg(id);
        console.log(jpg)
        new OBJLoader()
            .load(ImgPathUtils.getObj(id), ( group ) => {
                console.log("load success")
                const textureLoader = new THREE.TextureLoader(undefined, canvas)
                material.roughness = 1;
                material.metalness = 1;
                material.map = textureLoader.load(
                    jpg,
                    render
                );
                material.map.encoding = THREE.sRGBEncoding;
                material.map.wrapS = THREE.RepeatWrapping;

                group.traverse( function ( child ) {
                    ////console.log('child', child.isMesh)
                    if ( child.isMesh ) {
                        child.material = material;
                    }
                } );
                scene.add(group);
            }, (progress) => {
                console.log(progress)
            })
    }

    /**
     * 初始化灯光
     */
    function initLight() {
        const direLight = new THREE.DirectionalLight(0xffffff, 1.0);
        direLight.position.set(100, 300, 100)
        scene.add(direLight);
        // const light = new THREE.AmbientLight( 0xFFFFFF ); // soft white light
        // scene.add(light);
    }

    /**
     * 渲染函数
     */
    function render() {
        renderer.render(scene, camera)
        controls.update()
        // ////console.log("render")
        canvas.requestAnimationFrame(()=>{
            render()
        });
    }

    render()
}