import { scrollProps } from './index.js'; 

let width = window.innerWidth;
let height = window.innerHeight;




let perlinMax = 300;





let mouse = {
  x: width / 2,
  y: height / 2
}

let scene, camera, renderer;
scene = new THREE.Scene();

// scene.fog = THREE.Fog(0x000001, 11);

let fov = 90;
let aspect = width / height;
let near = 1;
let far = 15500;
camera = new THREE.PerspectiveCamera(fov, width / height, near, far);
// camera.position.set(0, 12, 14);
camera.position.set(300, 1120, 3250);
camera.rotateY(.87532921);
camera.rotateZ(.141);
// camera.rotation.z = -Math.PI / 2;//.set(800, 295, 950);
// camera.lookAt(0, 0, 0);
// camera.lookAt(new THREE.Vector3(-100, -1000, 10100));
camera.updateMatrix();

renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setSize(width, height);

// renderer.setClearColor(0xffffff);
renderer.shadowMap.enablesd = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.needsUpdate = true;

// document.body.appendChild(renderer.domElement);
document.querySelector('.canvas').appendChild(renderer.domElement);

// scene.background = 0xffffff;
scene.fog = new THREE.Fog(0xd87be8,  -15, 2330);



//SKYBOX

// const loader = new THREE.CubeTextureLoader();
// const root = '../img/bkg3_'
// const texture = loader.load([
  
//   root + 'right.png', 
//   root + 'left.png', 
//   root + 'top.png', 
//   root + 'bottom.png', 
//   root + 'front.png', 
//   root + 'back.png'
// ]);
// console.log(texture)
// let materialArray = [];
// texture.forEach( texture => materialArray.push(new THREE.MeshBasicMaterial({map: texture})));
// let skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
// let skybox = new THREE.Mesh(skyboxGeo, materialArray);
// scene.add(skybox);
// scene.background = texture;





// scene.fog = new THREE.Fog( 0x040306, 1, 300 );


// let controls = new THREE.OrbitControls(camera, renderer.domElement);
// controls.maxZoom = 10;
// controls.addEventListener( 'change', function() { renderer.render(scene, camera); } );




//--------------------------------------------------------------------Icosahedron Casing

let icosRad = 1000;
let icosG = new THREE.IcosahedronBufferGeometry(icosRad, 1);
let icosM = new THREE.MeshPhongMaterial({color: 0xffffff, side: THREE.DoubleSide});
let icos = new THREE.Mesh(icosG, icosM);

icos.position.set()
scene.add(icos);
//--------------------------------------------------------------------Perlin Particle Rug









const ImprovedNoise = function () {
  
  let p = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,
    23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,
    174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,
    133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,
    89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,
    202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,
    248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,
    178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,
    14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,
    93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
    
    for (let i=0; i < 256 ; i++) {
      
      p[256+i] = p[i];
      
    }
    
    function fade(t) {
      
      return t * t * t * (t * (t * 6 - 15) + 10);
      
    }
    
    function lerp(t, a, b) {
      
      return a + t * (b - a);
      
    }
    
    function grad(hash, x, y, z) {
      
      let h = hash & 15;
      let u = h < 8 ? x : y, v = h < 4 ? y : h == 12 || h == 14 ? x : z;
      return ((h&1) == 0 ? u : -u) + ((h&2) == 0 ? v : -v);
      
    }
    
    return {
      
      noise: function (x, y, z) {
        
        let floorX = Math.floor(x), floorY = Math.floor(y), floorZ = Math.floor(z);
        
        let X = floorX & 255, Y = floorY & 255, Z = floorZ & 255;
        
        x -= floorX;
        y -= floorY;
        z -= floorZ;
        
        let xMinus1 = x -1, yMinus1 = y - 1, zMinus1 = z - 1;
        
        let u = fade(x), v = fade(y), w = fade(z);
        
        let A = p[X]+Y, AA = p[A]+Z, AB = p[A+1]+Z, B = p[X+1]+Y, BA = p[B]+Z, BB = p[B+1]+Z;
        
        return lerp(w, lerp(v, lerp(u, grad(p[AA], x, y, z), 
        grad(p[BA], xMinus1, y, z)),
        lerp(u, grad(p[AB], x, yMinus1, z),
        grad(p[BB], xMinus1, yMinus1, z))),
        lerp(v, lerp(u, grad(p[AA+1], x, y, zMinus1),
        grad(p[BA+1], xMinus1, y, z-1)),
        lerp(u, grad(p[AB+1], x, yMinus1, zMinus1),
        grad(p[BB+1], xMinus1, yMinus1, zMinus1))));
        
      }
    }
  }
  
  
  
  
  
  
  
  
  class Perlin {
    constructor() {
      this.grad3 =    
      [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0], 
      [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1], 
      [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]]; 
      this.p = [];
      for (let i=0; i<256; i++) {
        this.p[i] = Math.floor(Math.random()*256);
      }
      
      // To remove the need for index wrapping, double the permutation table length 
      this.perm = []; 
      for(let i=0; i<512; i++) {
        this.perm[i]=this.p[i & 255];
      } 
      
      // A lookup table to traverse the simplex around a given point in 4D. 
      // Details can be found where this table is used, in the 4D noise method. 
      this.simplex = [ 
        [0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0], 
        [0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0], 
        [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0], 
        [1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0], 
        [1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0], 
        [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0], 
        [2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0], 
        [2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]; 
      }
      
      dot(g, x, y) { 
        return g[0]*x + g[1]*y;
      }
      
      noise(xin, yin) { 
        let n0, n1, n2; // Noise contributions from the three corners 
        // Skew the input space to determine which simplex cell we're in 
        let F2 = 0.5*(Math.sqrt(3.0)-1.0); 
        let s = (xin+yin)*F2; // Hairy factor for 2D 
        let i = Math.floor(xin+s); 
        let j = Math.floor(yin+s); 
        let G2 = (3.0-Math.sqrt(3.0))/6.0; 
        let t = (i+j)*G2; 
        let X0 = i-t; // Unskew the cell origin back to (x,y) space 
        let Y0 = j-t; 
        let x0 = xin-X0; // The x,y distances from the cell origin 
        let y0 = yin-Y0; 
        // For the 2D case, the simplex shape is an equilateral triangle. 
        // Determine which simplex we are in. 
        let i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords 
        if(x0>y0) {i1=1; j1=0;} // lower triangle, XY order: (0,0)->(1,0)->(1,1) 
        else {i1=0; j1=1;}      // upper triangle, YX order: (0,0)->(0,1)->(1,1) 
        // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and 
        // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where 
        // c = (3-sqrt(3))/6 
        let x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords 
        let y1 = y0 - j1 + G2; 
        let x2 = x0 - 1.0 + 2.0 * G2; // Offsets for last corner in (x,y) unskewed coords 
        let y2 = y0 - 1.0 + 2.0 * G2; 
        // Work out the hashed gradient indices of the three simplex corners 
        let ii = i & 255; 
        let jj = j & 255; 
        let gi0 = this.perm[ii+this.perm[jj]] % 12; 
        let gi1 = this.perm[ii+i1+this.perm[jj+j1]] % 12; 
        let gi2 = this.perm[ii+1+this.perm[jj+1]] % 12; 
        // Calculate the contribution from the three corners 
        let t0 = 0.5 - x0*x0-y0*y0; 
        if(t0<0) n0 = 0.0; 
        else { 
          t0 *= t0; 
          n0 = t0 * t0 * this.dot(this.grad3[gi0], x0, y0);  // (x,y) of grad3 used for 2D gradient 
        } 
        let t1 = 0.5 - x1*x1-y1*y1; 
        if(t1<0) n1 = 0.0; 
        else { 
          t1 *= t1; 
          n1 = t1 * t1 * this.dot(this.grad3[gi1], x1, y1); 
        }
        let t2 = 0.5 - x2*x2-y2*y2; 
        if(t2<0) n2 = 0.0; 
        else { 
          t2 *= t2; 
          n2 = t2 * t2 * this.dot(this.grad3[gi2], x2, y2); 
        } 
        // Add contributions from each corner to get the final noise value. 
        // The result is scaled to return values in the interval [-1,1]. 
        return 70.0 * (n0 + n1 + n2); 
      }
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // let 
    let perlin = new Perlin();
    let rugW = 51, rugH = 34;
    let particleR = 2;
    let rugGap = 82;
    
    let rug = createRug();
    rug.position.y += perlinMax;
    rug.rotation.x = -Math.PI / 2;
    scene.add(rug);
    
    function createRug() {
      let rug = new THREE.Object3D;
      let particlG = new THREE.SphereBufferGeometry(particleR, 11,  15);//THREE.DodecahedronBufferGeometry(particleR, 0); //THREE.SphereBufferGeometry(particleR, 3, 15);
      let particleM = new THREE.MeshToonMaterial({color: 0xffffff, reflectivity: 1, shininess: 5});
      // particleM.specular = 0xff0000;
      particleM.flatShading = true;
      let particle;
      for(let i = 0; i < rugH; i++) {
        
        for(let j = 0; j < rugW; j++) {
          particle = new THREE.Mesh(particlG, particleM);
          particle.position.set((-rugW / 2) * rugGap + j * rugGap, rugH / 2 - i * rugGap, 0);
          particle.castShadow = true;
          particle.receiveShadow = true;
          rug.add(particle);
        }
      }
      
      return rug;
    }
    
    let xOffset = 0;
    let yOffset = 0;
    function update() {
      xOffset += 1.9;
      yOffset += 3.1;
      let now = Date.now() * .0001;
      
      
      //FOG UPDATE
      
      
      scene.fog.color.setRGB(
        0.2 + 0.8 * (Math.cos(now) / 2 + 0.5),
        0.3 + 0.6 * (1 - Math.pow(Math.sin(now), 2)),
        0.7 + 0.3 * (Math.sin(now) / 2 + 0.5)
      );
      // .setHSL(
      //   0.7 + 0.3 * Math.sin(now / 3), 
      //   0.8 + 0.2 * (Math.cos(now) / 2 + 1), 
      //   0.6 + 0.4 * (Math.sin(now * 2) / 2 + 1)
      // );
      // scene.fog.color = new THREE.Color(
      //   Math.cos(now * 2) * 0.5 + 0.4,
      //   0.15,
      //   Math.sin(now * 2 + 10) * 0.45 + 0.4
      //   );
        




        // console.log('update',rug.children[0].geometry)
        let vertices = rug.children;//geometry.attributes.position.array;
        for(let i = 0; i < vertices.length; i++) {
          let particle = vertices[i];
          particle.position.z = (perlin.noise((particle.position.x + xOffset) / 955, (particle.position.y + yOffset) / 950) / 2 + 0.5 ) * perlinMax;//(Math.sin(now) / 2 + 0.5) * Math.abs(rugW / 2 - particle.position.x) / 7 + (Math.cos(now) / 2 + 0.5) * Math.abs(rugW / 2 - particle.position.y) / 3;
          particle.scale.x = 
          particle.scale.y = 
          particle.scale.z = 
          Math.pow(particle.position.z / (perlinMax * 0.6), 6) / 1.25;
          // if (particle.position.z <= 10 || particle.position.z >= 190)
          // console.log(particle.position.z)
          let r = (particle.position.z / perlinMax) * 255 * 0.5;
          let g = (particle.position.z / perlinMax) * 255 * 0.6;
          let b = (particle.position.z / perlinMax) * 255 * 0.7;
          
          // particle.rotation.x = Math.sin() * particle.position.z / 2 + 0.5;
          // particle.geometry.rotatex(Math.cos() * particle.position.z / 2 + 0.5  );
          // particle.material.color.setHex(r, g, b)
          // particle.customDepthMaterial.setColor(255 * particle.position.z / 50, 255 * particle.position.z / 50, 255 * particle.position.z / 50)
        }
        // console.log(rug)
        // console.log(p)
        // col.children.forEach(disc =>  {
        //   // console.log(disc.geometry.attributes);
        //   // disc.scale.x += Math.sin(now)
        //   // disc.scale.z += Math.sin(now)
        // });
        for ( let i = 0 ; i < discs.length ; i++ ) {
          // discs.forEach(disc => {
          // console.log('INDIV DISC',discs[i], discs);
          // discs[i].rotation.y = Math.sin(now)
          // console.log('DISCS ROTATION', disc.rotation.y)
          // console.log('DISCS', discs)
          // for ( let j = 0 ; j < pointsOnDisc ; j++ ) {
          
          // })
        }
        
        // pointLight.intensity = Math.sin(now * 1000) * 221 + 0.2;
        // console.log(pointLight.intensity, Date.now())
        
        // theta += now;
        // phi += now * 1.2;
        // console.log(sphere)
        
        // x = r * cos(s) * sin(t)
        // y = r * sin(s) * sin(t)
        // z = r * cos(t)
        
        
        // sphere.children.forEach(childSphere => {
        //   // console.log('updating child sphere')
        //   childSphere.position.x = 17 * Math.cos(theta) * Math.sin(phi);
        //   childSphere.position.y = 17 * Math.sin(theta) * Math.cos(phi);
        //   childSphere.position.z = 17 * Math.cos(phi);
        //   // childSphere.position.x += 1;
        //   // childSphere.position.y += Math.cos(now) * 1/0;
        //   // childSphere.position.z = -200;
        // });
        // lights.forEach((light, index) => {
        
        //   console.log('foeach stick')
        //   console.log('sticks index',sticks[index])
        //   light.position.x += sticks[index].dirx;
        //   light.position.y += sticks[index].diry;
        //   light.position.z += sticks[index].dirz;
        
        
        // // randomPosNegBasic(285),
        // // Math.random() * 170 - 15,
        // // -(Math.random() * 110 + 120)
        
        
        //   if (light.position.x > 700 || light.position.x < -700) {
        //     light.position.x *= -1;
        //   }
        
        //   if (light.position.y > 365 || light.position.y < -125) {
        //     light.position.y *= -1;
        //   }
        
        //   if (light.position.z > 230 || light.position.z < -200) {
        //     light.position.z *= -1;
        //   }
        
        //   // stickGroup.children[index].rotation.z = now;
        
        //   // lights[index].position.set(
        //   //   stick.position.x,
        //   //   stick.position.y,
        //   //   stick.position.z
        //   // )
        
        
        
        // });
        
        //CAMERA UPDATES
        
        // console.log('COORDS',mouse.x, mouse.y)

        // camera.position.x = (1 - mouse.x) * 30;
        // camera.position.z += (1 - mouse.x) * 2;

        
        // if (camera.position.x < 300 && camera.position.x > -300) {
        //   camera.position.x += ( -(mouse.x - width / 2) / (width / 2));  // (camera.position.x + 1) ) / 10
        // }else {
        //   camera.position.x = camera.position.x > 300 ? 300 : -300;
        // }
        
        // if (camera.position.z <= 50 && camera.position.z >= 0) {
        //   camera.position.z += Math.abs(mouse.x - width / 2) / (width / 2) ;
        // }else {
        //   camera.position.z = camera.position.z > 50 ? 50 : 0;
        // }
        // camera.position.x = (-mouse.x - camera.position.x) / 20- 100;
        // camera.position.y = (-mouse.y - camera.position.y + mouse.x / 3) / 20;
        // camera.position.z = (mouse.x - camera.position.x) / 25;
        // console.log(camera.position);
      }
      
      
      //--------------------------------------------------------------------LIGHTS
      
      // let directionalLight = new THREE.DirectionalLight(0xf20200, 100);
      // directionalLight.target = plane;
      // directionalLight.position.set(0, 100, 0);
      
      
      // let directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
      // scene.add(directionalLightHelper);;
      // let dLight = new THREE.DirectionalLight(0xff012f, 1);
      // dLight.target = new THREE.Vector3(0, 0, 0);
      // dLight.position.set(-150, 175, -950);
      // scene.add(dLight);
      let spotLight = new THREE.SpotLight(0xffffff, .1, 100, 3.95, 2); //( color : Integer, intensity : Float, distance : Float, angle : Radians, penumbra : Float, decay : Float )
      spotLight.castShadow = true;
      
      spotLight.shadow.mapSize.width = 1024;
      spotLight.shadow.mapSize.height = 1024;
      
      spotLight.position.set(0, -250, 0);
      // scene.add(spotLight);
      
      let secondSpotLight = new THREE.SpotLight(0xfffff, 1, 2500, 3.95, 2); //( color : Integer, intensity : Float, distance : Float, angle : Radians, penumbra : Float, decay : Float )
      secondSpotLight.castShadow = true;
      
      secondSpotLight.shadow.mapSize.width = 1024;
      secondSpotLight.shadow.mapSize.height = 1024;
      
      secondSpotLight.position.set(1000, 550, -800);
      // scene.add(secondSpotLight);
      // spotLight.target = rug //set(0, 1050, 0);
      
      // let helper = new THREE.SpotLightHelper(spotLight);
      // scene.add(helper);
      let ambientLight = new THREE.AmbientLight(0xffffff, 1.15);
      
      // scene.add(directionalLight);
      // scene.add(ambientLight);
      // let spotLightTarget = new THREE.Object3D();
      // let vertex = new THREE.Vector3(0, 0, -250);
      // spotLightTarget.add(vertex);
      // scene.add(spotLightTarget);
      // spotLight.target = spotLightTarget;
      
      // let pointLight = new THREE.PointLight(0xffffff, 2.5, 1110, 2);
      // pointLight.position.set(0, 0, -250);
      // scene.add(pointLight);
      
      //-------------------------------------------------------------------RAYCASTER
      
      
      let raycaster; //, mouse = { x : 0, y : 0 };
      
      init();
      
      function init () {
        
        //Usual setup code here.
        
        raycaster = new THREE.Raycaster();
        renderer.domElement.addEventListener( 'hover', raycast );
        
        //Next setup code there.
        
      }
      
      function raycast ( e ) {
        
        //1. sets the mouse position with a coordinate system where the center
        //   of the screen is the origin
        // mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
        // mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
        
        //2. set the picking ray from the camera position and mouse coordinates
        raycaster.setFromCamera( mouse, camera );    
        
        //3. compute intersections
        let intersects = raycaster.intersectObjects( rug.children );
        
        for ( let i = 0; i < intersects.length; i++ ) {
          console.log( intersects[ i ] ); 

          intersects[i].object.geometry.position.z * 2;
          /*
          An intersection has the following properties :
          - object : intersected object (THREE.Mesh)
          - distance : distance from camera to intersection (number)
          - face : intersected face (THREE.Face3)
          - faceIndex : intersected face index (number)
          - point : intersection point (THREE.Vector3)
          - uv : intersection point in the object's UV coordinates (THREE.Vector2)
          */
        }
        
      }
      
      
      
      //--------------------------------------------------------------------TORUS COLUMNS
      
      
      
      
      
      
      class TorusColumn extends THREE.Object3D {
        constructor(torusNum, minRadius, maxRadius, tube, gap) {
          super(torusNum, minRadius, maxRadius, tube, gap);
          this.torusNum = torusNum;
          this.minRadius = minRadius;
          this.maxRadius = maxRadius;
          this.tube = tube;
          this.gap = gap;
          
          let toruses = this.createToruses();
          toruses.forEach(torus => this.add(torus));
          
          scene.add(this);
        }
        
        createToruses() {
          let toruses = [];
          let torusG, torusM, torus;
          
          let x = (mins.x + maxes.x) / 2;// + randomPosNegBasic(200);
          let y = (mins.y + maxes.y) / 2;// + randomPosNegBasic(20);
          let z = (mins.z + maxes.z) / 2;// + randomPosNegBasic(80);
          for(let i = 0 ; i <= torusNum ; i++) {
            let radius = minRadius + (maxRadius - minRadius)  * ( Math.abs(torusNum / 2 - i)) / 3;
            torusG = new THREE.TorusGeometry(radius, tube, 10, 50);
            // TorusGeometry(radius : Float, tube : Float, radialSegments : Integer, tubularSegments : Integer, arc : Float)
            
            torusM = new THREE.ShaderMaterial({
              uniforms: 
              { 
                "s":   { type: "f", value: -1.0},
                "b":   { type: "f", value: 1.0},
                "p":   { type: "f", value: 2.0 },
                glowColor: { type: "c", value: new THREE.Color(0x00ffff) }
              },
              vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
              fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
              side: THREE.FrontSide,
              blending: THREE.AdditiveBlending,
              transparent: true
            })
            torusM.shininess = 20;
            torus = new THREE.Mesh(torusG, torusM);
            
            torus.position.set(x, y + (torusNum / 2 - i) * (tube + gap) * 3, z);
            torus.rotation.x = -90;
            toruses.push(torus);
            
            
          }
          
          return toruses;
        }
        
      }
      
      
      
      
      
      let mins =  {
        x: -200,
        y: -100,
        z: -130
      };
      let maxes =  {
        x: 200,
        y: 100,
        z: -30
      };
      let minY = -100;
      let colNum = 10;
      let minToruses = 30;
      let maxToruses = 50;
      let torusNum = randomPosNeg(10, 15);
      let minRadius = 10;
      let maxRadius = 20;
      let tube = 1;
      let gap = 1;
      let cols = new Array(colNum);
      // let colsObject = new THREE.Object3D();
      
      // let col = new TorusColumn(torusNum, minRadius, maxRadius, tube, gap);
      
      // for(let i = 0 ; i < colNum ; i++) {
      //   col = new THREE.Object3D();
      //   torusNum = randomPosNeg(minToruses, maxToruses);
      
      //   for(let j = 0 ; j < torusNum ; j++) {
      //     torusG = new THREE.TorusGeometry()
      //   }
      // }
      
      
      
      
      
      
      
      
      
      
      
      
      //--------------------------------------------------------------------SPHERE OF SPHERES
      
      let sphereRadius = 10;
      let zLayers = 50;
      let pointSize = .07;
      
      let discs = new Array(zLayers + 1);
      let upperHems = [];
      
      let pointSphere = generatePointCloud( new THREE.Color( 1, 0, 0 ), zLayers );
      // pointSphere.scale.set( 5, 10, 10 );
      pointSphere.position.set( 0, 0, 0 );
      // scene.add( pointSphere );
      
      
      function generatePointCloud( color, zLayers ) {
        
        let sphereTheta;
        let sphereThetaIncrements = Math.PI / zLayers;
        let discTheta = Math.PI / 18;
        let k = 0;
        let currentDiscRadius = 0;
        let pointsOnDisc;
        
        let sphere = new THREE.Object3D();
        
        
        let pointGeo = new THREE.SphereGeometry(pointSize, 100, 100);
        let pointMat = new  THREE.MeshPhongMaterial( { 
          color: 0xba2233,
          // envMap: envMap, // optional environment map
          specular: 0x050505,
          shininess: 50
        } ) ;
        // let sphereMat = new  THREE.MeshPhongMaterial( { 
        //   color: 0xba2233,
        //   // envMap: envMap, // optional environment map
        //   specular: 0x050505,
        //   shininess: 50
        // } ) ;
        
        // let pointsNum = calcNumOfPoints();
        // let positions = new Float32Array();//( numPoints * 3 );
        // let colors = new Float32Array();//( numPoints * 3 );
        
        let currentY;
        for ( let i = 0 ; i <= Math.ceil(zLayers / 2) ; i++ ) {
          
          // let discGeo = new THREE.BufferGeometry();
          // let discMat = new  THREE.MeshPhongMaterial( { 
          //   color: 0xba2233,
          //   // envMap: envMap, // optional environment map
          //   specular: 0x050505,
          //   shininess: 50
          // } ) ;
          
          let discUpper = new THREE.Object3D();
          let discLower = new THREE.Object3D(); //Mesh(discGeo, discMat);
          sphereTheta = i * sphereThetaIncrements;
          currentDiscRadius = Math.sin(sphereTheta) * sphereRadius;
          // discTheta = Math.PI / currentDiscRadius * 5;
          currentY = (sphereRadius * 2 / zLayers) * i - sphereRadius;
          pointsOnDisc = 1 + currentDiscRadius * 3;
          for ( let j = 0 ; j < pointsOnDisc ; j++ ) {
            discTheta = j * Math.PI * 2 / pointsOnDisc;
            // let u = i / width;
            // let v = i / length;
            let x = Math.sin(discTheta) * currentDiscRadius;
            let y = currentY;//( Math.cos( u * Math.PI * 4 ) + Math.sin( v * Math.PI * 8 ) ) / 20;
            let z = Math.cos(discTheta) * currentDiscRadius;
            
            // console.log('COORDS', x, y, z);
            let pointLower = new THREE.Mesh(pointGeo, pointMat);
            discLower.add(pointLower);
            pointLower.position.set(x, y, z);
            
            discs[j] = discLower;
            sphere.add(discLower);
            if (i === Math.ceil(zLayers / 2) && (zLayers + 1) % 2 === 0) {
              continue;
            }
            let pointUpper = new THREE.Mesh(pointGeo, pointMat);
            discUpper.add(pointUpper);
            pointUpper.position.set(x, -y, z);
            
            discs[pointsOnDisc - 1 - j] = discUpper;
            sphere.add(discUpper);
            
            
            // positions[ 3 * k ] = x;
            // positions[ 3 * k + 1 ] = y;
            // positions[ 3 * k + 2 ] = z;
            // positions.push(x);
            // positions.push(y);
            // positions.push(z);
            
            // let intensity = ( y + 0.1 ) * 5;
            // // colors[ 3 * k ] = color.r * intensity;
            // // colors[ 3 * k + 1 ] = color.g * intensity;
            // // colors[ 3 * k + 2 ] = color.b * intensity;
            // colors.push(color.r * intensity);
            // colors.push(color.g * intensity);
            // colors.push(color.b * intensity);
            
            // k ++;
            
          }
          
          // sphere.add(disc);
          // upperHems.push(disc);
          
          // console.log('DISCS', discs)
        }
        
        // lowerHems = [...upperHems].reverse().slice(1)
        
        // for ( let i = 0 ; i < lowerHems.length ; i++ ) { 
        
        //   console.log('FIRST LOOOPPPPPPPPPPPPPPPPPPPPPPPPP');
        //   let currentDisc = lowerHems[i].children;
        //   for ( let j = 0 ; j < currentDisc.length ; j++ ) { 
        
        //     let point = currentDisc[j];
        //     console.log('second LOOOPPPPPPPPPPPPPPPPPPPPPPPPP', point);
        //     point.position.y = -point.position.y;
        //     console.log('POINT', point.position.y);
        //   }
        // }
        
        // discs = [...upperHems, ...lowerHems];
        // discs.forEach(disc => sphere.add(disc));
        // console.log('DISCS', discs);
        
        
        // geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        // // geometry.setAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
        // geometry.computeBoundingBox();
        
        return sphere;
        
      }
      
      // function generatePointCloud( color, zLayers ) {
      
      //   let geometry = generatePointCloudGeometry( color, zLayers );
      //   let material = new THREE.PointsMaterial( { size: pointSize, vertexColors: THREE.VertexColors } );
      
      //   return new THREE.Points( geometry, material );
      
      // }
      
      
      //---------------------------------------------------------------------SPHERE
      
      
      let sphereG = new THREE.SphereGeometry(14, 50, 50);
      let sphereM = new  THREE.MeshPhongMaterial( { 
        color: 0x996633,
        // envMap: envMap, // optional environment map
        specular: 0x050505,
        shininess: 50
      } ) ;
      let sphere = new THREE.Mesh(sphereG, sphereM);
      sphere.rotation.x = -0.5 * Math.PI;
      sphere.position.set(0, 0, -30);
      // scene.add(sphere);
      addMiniSpheres(sphere);
      
      
      // let pointLight = new THREE.PointLight(0xffffff, 3);
      // pointLight.position.set(0, 10, -35);
      // scene.add(pointLight);
      
      //--------------------------------------------------------------------MINI SPHERES
      
      function addMiniSpheres(motherSphere) {
        let msphereG, msphereM, msphere;
        for(let i = 0 ; i < 1 ; i++) {
          msphereG = new THREE.SphereGeometry(.5, 50, 50);
          msphereM = new  THREE.MeshPhongMaterial( { 
            color: 0xba2233,
            // envMap: envMap, // optional environment map
            specular: 0x050505,
            shininess: 50
          } ) ;
          msphere = new THREE.Mesh(msphereG, msphereM);
          msphere.add(new THREE.PointLight(0xffffff, .8));
          // motherSphere.add(msphere);
          
          
        }
        
      }
      
      //--------------------------------------------------------------------PLANE
      
      let planeGeometry = new THREE.PlaneGeometry(500, 500, 2, 2);
      let planeMaterial = new  THREE.MeshPhongMaterial( { 
        color: 0x996633,
        // envMap: envMap, // optional environment map
        specular: 0x050505,
        shininess: 50
      } ) ;
      let plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.rotation.x = -0.5 * Math.PI;
      plane.position.set(0, 0, -250);
      // scene.add(plane);
      
      // let gridHelper = new THREE.GridHelper(1000, 100, 0xffffff, 0x000000);
      // // gridHelper.position.set
      // // scene.add(gridHelper);
      //--------------------------------------------------------------------CLUSTER
      
      
      // let tkGroup = new THREE.Group();
      // let tkGeom, tkMat, tk; 
      // for(i = 0 ; i < 140 ; i++) {
      // tkGeom = new THREE.TorusKnotGeometry( 1 + Math.random() * 15, 
      // Math.random() * 3 + 0.3, 
      // Math.random() * 100 + 50, 
      // Math.random() * 16 + 4 );
      // tkMat = new THREE.MeshPhongMaterial( { 
      //   color: 0x996633,
      //   // envMap: envMap, // optional environment map
      //   specular: 0x050505,
      //   shininess: 100
      // } ) ;
      
      // //THREE.MeshPhongMaterial( { color: 0x30010 } );
      // tk = new THREE.Mesh( tkGeom, tkMat );
      // tk.position.set(
      // randomPosNegBasic(285),
      // Math.random() * 170 - 15,
      // -(Math.random() * 110 + 120)
      // );
      // tk.rotation.x = Math.random() * Math.PI * 2;
      // tk.rotation.y = Math.random() * Math.PI * 2;
      // tk.rotation.z = Math.random() * Math.PI * 2;
      
      
      // tk.matrixAutoUpdate = false;
      // tk.updateMatrix();
      // tkGroup.add( tk );
      // }
      
      // scene.add(tkGroup);
      
      
      //--------------------------------------------------------------------LIGHT STICKS
      
      // class Stick {
      // constructor(stick, dirx, diry, dirz, rotSpeed) {
      //   this.stick = stick;
      //   this.dirx = dirx;
      //   this.diry = diry;
      //   this.dirz = dirz;
      //   this.rotSpeed = rotSpeed;
      // }
      
      
      // }
      
      // let sticks = [];
      // let lights = [];
      
      // let stickGroup = new THREE.Group();
      // let sGeo, sMat, sMesh, stick;
      
      // let pointLight;
      // for(i = 0 ; i < 30 ; i++) {
      // sGeo = new THREE.CylinderGeometry( 1, 1, 50, 32 );
      // sMat = new THREE.MeshLambertMaterial( {color: 0xf20110} );
      // sMesh = new THREE.Mesh( sGeo, sMat );
      // // stickGroup.add( sMesh );
      
      // stick = new Stick(
      //   sMesh, 
      //   randomPosNegBasic(30) + 5,
      //   randomPosNegBasic(0.4),
      //   randomPosNegBasic(0.1),
      //   Math.random() * 38
      // );
      // stick.stick.position.set(randomPosNeg(200, 300), randomPosNeg(0, 100), -Math.random() * 130);
      // stick.stick.rotation.z = randomPosNegBasic(360) * Math.PI / 180;
      // sticks.push(stick);
      
      // pointLight = new THREE.PointLight(0xffffff, 1.1, 150, 2);
      // // pointLight.add(sMesh);
      // pointLight.position.set(
      //   randomPosNegBasic(285),
      //   Math.random() * 170 - 15,
      //   -(Math.random() * 110 + 120)
      //   );
      // lights.push(pointLight);
      // scene.add(pointLight);
      // }
      
      // scene.add(stickGroup);
      
      function randomPosNeg(small = 0, big = 300) {
        return (small + Math.random() * (big - small)) * (Math.random() > 0.5 ? 1 : -1);
      }
      //--------------------------------------------------------------------CUBES
      
      // let cubeGroup = new THREE.Group();
      // let cubeG, cubeM, cube;
      // cubeG = new THREE.BoxGeometry(10, 20, 10);
      // cubeM = new THREE.MeshPhongMaterial({
      //   color:0xfffff0,
      //   side:THREE.DoubleSide
      // });
      
      // for(i = 0 ; i < 100 ; i = i + 10) {
      //   for(j = 0 ; j < 100 ; j = j + 10) {
      
      //     cube = new THREE.Mesh(cubeG, cubeM);
      //     cube.position.set(i - 50, cube.geometry.parameters.height / 2, j - 50);
      //     console.log(cube)
      //     cubeGroup.add(cube);
      //     scene.add(cubeGroup);
      //   }
      // }
      
      
      // let theta = 0.5, phi = 1.2;
      let g = new THREE.PlaneGeometry(10, 10, 10);
      let m = new THREE.MeshBasicMaterial();
      let p = new THREE.Mesh(g, m);
      
      
      
      //   let cubes = cubeGroup.children;
      //   let now = Date.now() * 0.00001;
      //   let particular = cube.position.x * cube.position.z;
      //   for (let cube of cubes) {
      //     console.log(cube)
      
      //     cube.scale.y = Math.sin(particular + now) * 10;
      //     if( ! cube.geometry.boundingBox ) cube.geometry.computeBoundingBox();
      //     let height = cube.geometry.boundingBox.max.y - cube.geometry.boundingBox.min.y;
      //     cube.position.y = height / 2;
      //   }
      
      
      function randomPosNegBasic(limit) {
        return Math.random() * limit - Math.random() * limit;
      }
      
      function render() {
        renderer.render(scene, camera);
        // console.log(scene.children)
      }
      
      let frame = requestAnimationFrame(animate);
      const navInput = document.querySelector('.nav__input');
      function animate() {
        // console.log('ANIMATING ANIMATIN FRMAE', scrollProps.activeSection)
        frame = requestAnimationFrame(animate);
        if (scrollProps.activeSection === 0 && !navInput.checked) {
          update();
          render();
        }
        
        // controls.update();
      }

      animate();
      
      window.addEventListener('resize', e => {
  console.log('RESIZE LISTERNER STICKSJS')
        width = window.innerWidth;
        height = window.innerHeight;
        
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      })
      
      // window.addEventListener('mousemove', e => {
      //   mouse = {
      //     x: (e.clientX / width) * 2 - 0.7,
      //     y: -(e.clientY / height) * 2 + 1
      //   }
      // })
      
      
      
      
      
      
      
      
      