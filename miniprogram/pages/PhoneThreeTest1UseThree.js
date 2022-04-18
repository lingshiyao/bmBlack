import * as THREE from "../api/three/three.min"

const {windowWidth, windowHeight, pixelRatio,} = wx.getSystemInfoSync();
let canvas, scene, renderer, camera;
let cube;
export default (_canvas) => {
    canvas = _canvas;

    canvas.width = windowWidth * pixelRatio;
    canvas.height = windowHeight * pixelRatio;

    // 防止threejs报错，本意是修改canvas的style上的属性，即视图窗口大小
    canvas.style = {}
    canvas.style.width = windowWidth;
    canvas.style.height = windowHeight;

    initScene(); // 初始化场景
    initCamera(); // 初始化相机
    initRenender(); // 初始化渲染器
    initLight(); // 初始化光线
    // initOthers(); // 初始化其他参数
    // initaxisHelper(); // 辅助坐标
    initGeometrys() // 初始化物体

    /**
     * 初始化场景
     */
    function initScene() {
        scene = new THREE.Scene();
    }

    /**
     * 初始化相机
     */
    function initCamera() {
        camera = new THREE.PerspectiveCamera(
            60,
            canvas.width / canvas.height,
            1,
            200
        );
    }

    /**
     * 初始化渲染器
     */
    function initRenender() {
        renderer = new THREE.WebGLRenderer({
            canvas,
        });
        renderer.setClearColor(0x7fffd4, 1)
    }

    /**
     * 初始化灯光
     */
    function initLight() {
        const ambiLight = new THREE.AmbientLight(0x333333);
        scene.add(ambiLight);

        const direLight = new THREE.DirectionalLight(0xffffff, 1.0);
        direLight.position.set(100, 300, 100);
        scene.add(direLight);
    }

    /**
     * 初始化物体
     */
    function initGeometrys() {
        const cubeGeo = new THREE.BoxGeometry(30, 30, 30);
        //创建材质，设置材质为基本材质（不会反射光线，设置材质颜色为绿色）
        const mat = new THREE.MeshBasicMaterial({color: 0xfca745});
        //创建Cube的Mesh对象
        cube = new THREE.Mesh(cubeGeo, mat);
        //设置Cube对象的位置
        cube.position.set(0, 0, -100);
        //将Cube加入到场景中
        scene.add(cube);
    }

    /**
     * 设置动画
     */
    function animation() {
        cube.rotation.y += 0.03;
    }

    /**
     * 渲染函数
     */
    function render() {
        animation()
        renderer.render(scene, camera)
        //////console.log("render")
        // canvas.requestAnimationFrame(()=>{
        //     render()
        // });
    }

    render()
}