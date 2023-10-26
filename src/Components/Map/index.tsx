import React,{useEffect, useState,useRef}from 'react';
import './index.css'; // Import the CSS file
import { buildings,engineeringHallCoords,scienceHallCoords } from './buildings';
import { getDownloadURL, getStorage,ref } from 'firebase/storage';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD5YUsJ0qRcmMTCEsXqHIOm6Jg0TGkBtDQ",
  authDomain: "where-is-it-8a8ff.firebaseapp.com",
  projectId: "where-is-it-8a8ff",
  storageBucket: "where-is-it-8a8ff.appspot.com",
  messagingSenderId: "398212843144",
  appId: "1:398212843144:web:32a6db31ab9e05a912013d",
  measurementId: "G-KH9GKZ4F9D"
};







let clickedbuilding=''; // clickedbuilding Map 안에 선언하면 state바뀌면 초기화돼서 제대로 동작 안 함

const Map = (props) => {
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const [imageurl,Setimageurl]=useState("");
  // firebase 관련코드

  let [clicked,setClicked]=useState(false);
  let tileSize = new naver.maps.Size(256,256),  // 건물 클릭했을 때 나오는 이미지의 사이즈를 의미
  proj = {
      
      fromCoordToPoint: function(coord) { 
          let pcoord = coord.clone();
          
          if (coord instanceof naver.maps.LatLng) {
              pcoord = new naver.maps.Point(coord.lng(), coord.lat());
          }
        
          return pcoord.div(tileSize.width, tileSize.height);
          // return pcoord.div(256, 256); // 사진이 지도의 어느 위치에 뜨는지 결정해주는 듯
      },

      fromPointToCoord: function(point) {
          return point.clone().mul(tileSize.width, tileSize.height);
          // return point.clone().mul(256, 256);
      }
  },  // getMapType 함수에서

  getMapType = async function(floor) { // getMapType 함수는 층을 입력받아서 그에 해당하는 옵션의 이미지 타입을 리턴
      // const imageRef = ref(storage, "gs://where-is-it-8a8ff.appspot.com/haerin"+(Number(floor.slice(0,-1))+1)+'F_0_0_0.jpeg'); // Replace with the actual path to your image
      
      
      const engineeringhall_0_0_0 = ref(storage, "gs://where-is-it-8a8ff.appspot.com/engineeringhall_0_0_0.png"); // Replace with the actual path to your image
      const engineeringhall_1_0_0 = ref(storage, "gs://where-is-it-8a8ff.appspot.com/engineeringhall_1_0_0.png"); // Replace with the actual path to your image
      const engineeringhall_1_0_1 = ref(storage, "gs://where-is-it-8a8ff.appspot.com/engineeringhall_1_0_1.png"); // Replace with the actual path to your image
      const engineeringhall_1_1_0 = ref(storage, "gs://where-is-it-8a8ff.appspot.com/engineeringhall_1_1_0.png"); // Replace with the actual path to your image
      const engineeringhall_1_1_1 = ref(storage, "gs://where-is-it-8a8ff.appspot.com/engineeringhall_1_1_1.png"); // Replace with the actual path to your image
     
    // https로 접근하려면 https://firebasestorage.googleapis.com/v0/b/where-is-it-8a8ff.appspot.com/o/engineeringhall_0_0_0.png?alt=media&token=토큰 입려하면됨
     
    // 이런 식으로 url 다 한 개씩 노가다로 받아와서
    // line 89에서 사용하고 tileset에 추가하는 방법 가능
    // 더 좋은 방법 없는지 물어보기
      
     
      let commonOptions = {
              name: '',
              minZoom: 0,
              maxZoom: 2,
              tileSize: tileSize,
              projection: proj,
              repeatX: false,
              // tileSet: '',
              vendor: '\xa9 NAVER Corp.',
              uid: ''
          },
      mapTypeOptions = {
              ...commonOptions,
              name: floor,
              tileSet:[ //'http://127.0.0.1:8080/haerin'+floor+'.jpeg',
                      //  'http://127.0.0.1:8080/engineeringhall_1_0_0.png',
                      //  'http://127.0.0.1:8080/engineeringhall_1_1_0.png',
                      //  'http://127.0.0.1:8080/engineeringhall_1_0_1.png', 
                      //  'http://127.0.0.1:8080/engineeringhall_1_1_1.png',
                      "https://storage.googleapis.com/where-is-it-8a8ff.appspot.com/engineeringhall%3A{z}%3A{x}%3A{y}.png"
                      // [a,b,c,d]로 놓으면 a가 (0,0)에, b가 (1,0)과 (0,1)에, c가 (1,1)에 들어옴
                    ], 
              // tileSet: 지도의 타일 이미지 URL 또는 URL의 목록을 지정, 건물을 누르면 뜨는 이미지의 URL을 tileSet에 입력하면 됨
              uid: 'naver:greenfactory:' + floor
          };
      
      // mapTypeOptions는 지도의 유형을 정의할 때 쓰이는 옵션


      // const engineeringhallurl_0_0_0 = await getDownloadURL(engineeringhall_0_0_0);
      // mapTypeOptions.tileSet.push(engineeringhallurl_0_0_0);
      // const engineeringhallurl_1_0_0 = await getDownloadURL(engineeringhall_1_0_0);
      // mapTypeOptions.tileSet.push(engineeringhallurl_1_0_0);
      // const engineeringhallurl_1_0_1 = await getDownloadURL(engineeringhall_1_0_1);
      // mapTypeOptions.tileSet.push(engineeringhallurl_1_0_1);
      // const engineeringhallurl_1_1_0 = await getDownloadURL(engineeringhall_1_1_0);
      // mapTypeOptions.tileSet.push(engineeringhallurl_1_1_0);  
      // const engineeringhallurl_1_1_1 = await getDownloadURL(engineeringhall_1_1_1);
      // mapTypeOptions.tileSet.push(engineeringhallurl_1_1_1);
      
      

      const promise = await new naver.maps.ImageMapType(mapTypeOptions);
      return promise;

      // console.log(url);
      // console.log(mapTypeOptions); // 정상출력
      // // mapTypeOptions.tileSet=[url]; //
      // console.log("url is Defined");
      // console.log(new naver.maps.ImageMapType(mapTypeOptions));
      // return new naver.maps.ImageMapType(mapTypeOptions);

      // then((url) =>{
      //   console.log(url);
      //   console.log(mapTypeOptions); // 정상출력
      //   // mapTypeOptions.tileSet=[url]; //
      //   console.log("url is Defined");
      //   console.log(new naver.maps.ImageMapType(mapTypeOptions));
      //   return new naver.maps.ImageMapType(mapTypeOptions);
      // });

      // console.log(new naver.maps.ImageMapType(mapTypeOptions));
      // return new naver.maps.ImageMapType(mapTypeOptions);
        
      // ImageMapType을 리턴할 건데 그 옵션을 mapTypeOptions로 줌
  };

  

  // const buildings = {
  //   'engineeringHall':['+1F','+2F','+3F'],
  //   'scienceHall':['+1F','+2F']
  // } 


  const loadMap = async () => {
    const mapDiv = document.getElementById('map');

    let mapOptions = {       
      center: new naver.maps.LatLng(37.5619, 126.9363), // Adjust the center as needed
      zoom: 15 // Adjust the zoom level as needed}
    }
    
    if(clicked){ // 건물이 클릭되었다면 지도에 들어가는 option을 바꿔서 이미지타입의 지도를 띄움, if문은 그 option을 변경하는 로직
      let maptypeids=buildings[clickedbuilding]; // maptypeids = ['+1F','+2F','+3F'] 이런 식으로 써있음
      let maptypes={
        // '+1F':getMapType('1F'),
        // '+2F':getMapType('2F'),
        // '+3F':getMapType('3F') 이런식으로 써야함
      };
      let a = 1;
      const setMapTypes = await Promise.all(
        buildings[clickedbuilding].map(async (value:string)=>{ 
          const result = await getMapType(value.substring(1));
          maptypes[value]=result; 
          console.log(a);
          return result;
    })
      ); //all()
      console.log("end");



      // 클릭된 빌딩의 정보를 가지고 maptypes를 update함
      
      mapOptions = {
      center: new naver.maps.Point(128, 128),
      zoom: 1,
      background: '#FFFFFF',
      mapTypes: new naver.maps.MapTypeRegistry(
          maptypes
      ), // 지도 유형의 컬렉션을 포함하는 객체
      mapTypeId: '+1F',   // mapTypeId: 초기 지도 유형의 id
      mapTypeControl: true, //
      mapTypeControlOptions: {
          mapTypeIds: maptypeids, //['+1F', '+2F', '+4F', '+5F'],
          position: naver.maps.Position.BOTTOM_CENTER, // 지도 유형 컨트롤을 배치할 위치.
          style: naver.maps.MapTypeControlStyle.BUTTON // 지도 유형 컨트롤의 스타일입니다.
      },
      zoomControl: true,
      zoomControlOptions: {
          position: naver.maps.Position.TOP_RIGHT
      }
      }
    }

    let map = new naver.maps.Map(mapDiv, mapOptions);  // option을 가지고 지도를 그림, if 문이 실행되면 이미지 타입의 옵션이 mapOption에 들어가고
                                                       // 아니라면 디폴트로 설정해놓은 옵션이 들어감

    let mks = [];
    
    props.markers.forEach( (marker) => {
        // console.log(map); // map은 undefined가 아님
        // console.log(marker);
        let mk = new naver.maps.Marker(
        {
          position: new naver.maps.LatLng(marker.latitude, marker.longitude),
          map:map
        }
      )
      mks.push(mk);
    });

    // Define polygon coordinates, 빨간 위치로 표시되는 곳의 위치
    // const engineeringHallCoords = [
    //   new naver.maps.LatLng(37.561849, 126.93575),
    //   new naver.maps.LatLng(37.561649, 126.936481),
    //   new naver.maps.LatLng(37.561889, 126.936550),
    //   new naver.maps.LatLng(37.562034, 126.935732),

    // ];

    // const scienceHallCoords =[
    //   new naver.maps.LatLng(37.564012, 126.938422),
    //   new naver.maps.LatLng(37.564012, 126.939433),
    //   new naver.maps.LatLng(37.563055, 126.939422),
    //   new naver.maps.LatLng(37.563055, 126.938433),
    // ];

    // Create the polygon , 빨간색으로 표시되는 네모상자를 만듦


    const PolygonOptions = {
      map: map,
      paths: engineeringHallCoords,
      strokeColor: '#D5DBDB', // Polygon 테두리 컬러
      strokeOpacity: 0.7,
      strokeWeight: 2,
      fillColor: '#E0F4F3',
      fillOpacity: 0.3,
      clickable: true
    }

    const engineeringHallPolygon = new naver.maps.Polygon(PolygonOptions);
    // 이 네모 상자를 클릭하면 함수가 실행되도록 eventListener를 등록
    naver.maps.Event.addListener(engineeringHallPolygon, "click", function () { ``
      alert('engineeringHallPolygon click');
      clickedbuilding='engineeringHall'; // 공학관
      // console.log('eventlistener is '+clickedbuilding);
      setClicked(true); // Clicked를 true로 바꿔서 useEffect 함수가 실행되도록해서 지도의 옵션을 이미지로 바꾸도록함

    });

    naver.maps.Event.addListener(engineeringHallPolygon, 'mouseover', () => {
        console.log('mouseover');
        engineeringHallPolygon.setOptions({
            ...PolygonOptions,fillColor:'gray'
        });
    });
  
    naver.maps.Event.addListener(engineeringHallPolygon, 'mouseout', () => {
        console.log('mouseout');
        engineeringHallPolygon.setOptions({
          ...PolygonOptions,fillColor:'#E0F4F3'
        });
    });

    // scienceHallPolygon과 여기에 대한 이벤트 리스너를 등록, 위의 engineeringHallPolygon과 똑같은 로직

    const scienceHallPolygon = new naver.maps.Polygon({
      ...PolygonOptions,paths: scienceHallCoords
    });

    naver.maps.Event.addListener(scienceHallPolygon, "click", function () {
      alert('scienceHallPolygon click');
      clickedbuilding='scienceHall'; // 과학관  
      setClicked(true);
    });

    naver.maps.Event.addListener(scienceHallPolygon, 'mouseout', () => {
      console.log('mouseout');
      scienceHallPolygon.setOptions({
        ...PolygonOptions,fillColor:'#E0F4F3',paths:scienceHallCoords
      });
  });
    naver.maps.Event.addListener(scienceHallPolygon, 'mouseover', () => {
      console.log('mouseover');
      scienceHallPolygon.setOptions({
          ...PolygonOptions,fillColor:'gray',paths:scienceHallCoords
      });
  });

  }

  useEffect(() => {
    loadMap();
  }, [clicked,props]);


// useEffect 끝, useEffect는 처음 화면이 마운트될때랑 clicked라는 state가 변경될 때마다 실행됨
  

  return (
    <div id="map-container">
    <div id="map" className={clicked+'a'}>
    </div>
    <div>
      {clicked&&<button onClick={()=>{window.location.reload();
}}>돌아가기</button>}
    </div>
    </div>
  );
};

export default Map
