import React,{useEffect, useState}from 'react';
import './index.css'; // Import the CSS file
import { Marker, NaverMap } from 'react-naver-maps';
let clickedbuilding=''; // clickedbuilding Map 안에 선언하면 state바뀌면 초기화돼서 제대로 동작 안 함

const Map = (props) => {

  let [clicked,setClicked]=useState(false);
  let tileSize = new naver.maps.Size(256,256),  // 건물 클릭했을 때 나오는 이미지의 사이즈를 의미
  proj = {
      fromCoordToPoint: function(coord) {
          let pcoord = coord.clone();
          
          if (coord instanceof naver.maps.LatLng) {
              pcoord = new naver.maps.Point(coord.lng(), coord.lat());
          }
        
          return pcoord.div(tileSize.width, tileSize.height);
      },

      fromPointToCoord: function(point) {
          return point.clone().mul(tileSize.width, tileSize.height);
      }
  },  // getMapType 함수에서

  
  getMapType = function(floor) { // getMapType 함수는 층을 입력받아서 그에 해당하는 옵션의 이미지 타입을 리턴
      console.log("floor+1 is "+(floor.slice(0,-1)+1));
      let commonOptions = {
              name: '',
              minZoom: 0,
              maxZoom: 16,
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
              tileSet:[//'http://127.0.0.1:8080/haerin'+floor+'.jpeg',
                       'http://127.0.0.1:8080/haerin'+(Number(floor.slice(0,-1))+1)+'F.jpeg' 
              ], 
              // tileSet: 지도의 타일 이미지 URL 또는 URL의 목록을 지정, 건물을 누르면 뜨는 이미지의 URL을 tileSet에 입력하면 됨
              uid: 'naver:greenfactory:' + floor
          };

      // mapTypeOptions는 지도의 유형을 정의할 때 쓰이는 옵션

      return new naver.maps.ImageMapType(mapTypeOptions);
      // ImageMapType을 리턴할 건데 그 옵션을 mapTypeOptions로 줌
  };

  const buildings = {
    'engineeringHall':['+1F','+2F','+3F'],
    'scienceHall':['+1F','+2F']
  } 


  useEffect(() => {
    
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

      buildings[clickedbuilding].map((value:string)=>{ maptypes[value]=getMapType(value.substring(1))})
      // 클릭된 빌딩의 정보를 가지고 maptypes를 update함
      
      mapOptions = {
      center: new naver.maps.Point(128, 128),
      zoom: 2,
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
        console.log(map); // map은 undefined가 아님
        console.log(marker);
        let mk = new naver.maps.Marker(
        {
          position: new naver.maps.LatLng(marker.latitude, marker.longitude),
          map:map
        }
      )
      mks.push(mk);
    });

    // Define polygon coordinates, 빨간 위치로 표시되는 곳의 위치
    const engineeringHallCoords = [
      new naver.maps.LatLng(37.561849, 126.93575),
      new naver.maps.LatLng(37.561649, 126.936481),
      new naver.maps.LatLng(37.561889, 126.936550),
      new naver.maps.LatLng(37.562034, 126.935732),

    ];

    const scienceHallCoords =[
      new naver.maps.LatLng(37.564012, 126.938422),
      new naver.maps.LatLng(37.564012, 126.939433),
      new naver.maps.LatLng(37.563055, 126.939422),
      new naver.maps.LatLng(37.563055, 126.938433),
    ];

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
      console.log('eventlistener is '+clickedbuilding);
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
      ...PolygonOptions,paths:scienceHallCoords
    });

    naver.maps.Event.addListener(scienceHallPolygon, "click", function () {
      alert('scienceHallPolygon click');
      clickedbuilding='scienceHall'; // 과학관  
      setClicked(true);
    });

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

