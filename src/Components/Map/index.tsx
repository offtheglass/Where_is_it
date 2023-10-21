import { MarkerData } from '../Markers';
import MiniView from '../MiniViews';
import { BuildingData, Buildings } from '../Buildings';
// import MiniView from '../MiniViews';
import { Container as MapDiv, NaverMap, Marker, Polygon, GroundOverlay, InfoWindow, useNavermaps } from 'react-naver-maps';
// import img1 from './floor1.png'
import React,{useEffect, useState, useRef }from 'react';
import './index.css'; // Import the CSS file

interface MapProps {
  markerDataList: MarkerData[];
}


// const Map: React.FC<MapProps> = ( {markerDataList} ) => {
  // let [clicked, setClicked]=useState(false);
  // let [clickedbuilding, setClickedBuilding]=useState(0);


const Map: React.FC<MapProps> = ({ markerDataList }) => {
  // const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  // const handleMarkerClick = (marker: MarkerData) => {
  //   setSelectedMarker(marker);
  // }
  const [clickedBuilding, setClickedBuilding] = useState<BuildingData | null>(null);
  const [clickedFloor, setClickedFloor] = useState<number | null>(null);
  const [clickedMarker, setClickedMarker] = useState<MarkerData | null>(null);

  const navermaps = useNavermaps();
  const imgBounds = new navermaps.LatLngBounds(
    new navermaps.LatLng(37.561244,126.935067),
    new navermaps.LatLng(37.560465,126.935955)
  );
  
  const engineeringHallCoords = [
    new naver.maps.LatLng(37.561252, 126.93653),
    new naver.maps.LatLng(37.561425, 126.93565),
    new naver.maps.LatLng(37.56245, 126.93603),
    new naver.maps.LatLng(37.56230, 126.936884),
  ];

  const handleMarkerClick = (someMarker: MarkerData) => {
    setClickedMarker(someMarker);
    console.log("marker clicked");
  }

  const handlePolygonClick = (buildingCode: string) => {
    const ClickedBuildingData = Buildings[buildingCode];
    setClickedBuilding(ClickedBuildingData);
    console.log("building clicked");
  }

  const handleFloorClick = (floorIndex: number) => {
    console.log("floor clicked: ", floorIndex);
    setClickedFloor(floorIndex);
  }

  return (
    <div>
      <MapDiv 
        style={{
          margin: '30px auto', 
          width: '90%', 
          height: '500px'
        }}
      >
        <NaverMap
          defaultCenter = {new navermaps.LatLng(37.5619, 126.9363)}
          defaultZoom = {18}
        >
          <Polygon 
            paths={[engineeringHallCoords]}
            strokeColor='#FF0000'
            strokeWeight= {2}
            fillColor='#FF0000'
            fillOpacity= {0.1}
            clickable = {true}
            onClick={()=> handlePolygonClick("eng")}
          />

          {markerDataList
            .filter((marker) => clickedFloor === null || parseInt(marker.id[1], 10) === clickedFloor+1)
            .map((marker)=> 
              <Marker
                key ={marker.id}
                position = {new navermaps.LatLng(marker.latitude, marker.longitude)}
                clickable = {true}
                onClick = {() => handleMarkerClick(marker)}
              />
          )}
          {/* {clickedMarker && (<Props of={InfoWindow} 
            position = {new navermaps.LatLng(clickedMarker.latitude, clickedMarker.longitude)}
            content = {'<div class="infowindow_container">{clickedMarker.description}</div>'}
          />
          )} */}
          {clickedBuilding && (
            <div>
              {Array.from({ length: clickedBuilding.floors }).map((_, floorIndex) => (
                <button style={{position: 'absolute', width: '30px', left: (floorIndex*35 + 10), bottom: 10}} key={floorIndex} onClick={() => handleFloorClick(floorIndex)}>
                  {floorIndex+1}
                </button>
              ))}
            </div>
          )}
          {/* <GroundOverlay url={img1} opacity= {0.8} bounds={imgBounds}/> */}
        </NaverMap>
      </MapDiv>
      {clickedMarker && (<MiniView 
        floor={parseInt(clickedMarker.id[1], 10)}
        description = {clickedMarker.description}
      />
      )}
    </div>
  );

//   let tileSize = new naver.maps.Size(256, 256),  // 건물 클릭했을 때 나오는 이미지의 사이즈를 의이

//   proj = {
//       fromCoordToPoint: function(coord: { clone: () => any; lng: () => number; lat: () => number; }) {
//           let pcoord = coord.clone();
          
//           if (coord instanceof naver.maps.LatLng) {
//               pcoord = new naver.maps.Point(coord.lng(), coord.lat());
//           }

//           return pcoord.div(tileSize.width, tileSize.height);
//       },

//       fromPointToCoord: function(point: { clone: () => { (): any; new(): any; mul: { (arg0: number, arg1: number): any; new(): any; }; }; }) {
//           return point.clone().mul(tileSize.width, tileSize.height);
//       }
//   },  // getMapType 함수에서

//   getMapType = function(floor: string) { // getMapType 함수는 층을 입력받아서 그에 해당하는 옵션의 이미지 타입을 리턴
//       let commonOptions = {
//               name: '',
//               minZoom: 0,
//               maxZoom: 4,
//               tileSize: tileSize,
//               projection: proj,
//               repeatX: false,
//               // tileSet: '',
//               vendor: '\xa9 NAVER Corp.',
//               uid: ''
//           },
//           mapTypeOptions = {
//               ...commonOptions,
//               name: floor,
//               tileSet:'http://127.0.0.1:8080/haerin'+floor+'.jpeg', 
//               // tileSet: 지도의 타일 이미지 URL 또는 URL의 목록을 지정, 건물을 누르면 뜨는 이미지의 URL을 tileSet에 입력하면 됨
//               uid: 'naver:greenfactory:' + floor
//           };

//       // mapTypeOptions는 지도의 유형을 정의할 때 쓰이는 옵션

//       return new naver.maps.ImageMapType(mapTypeOptions);
//       // ImageMapType을 리턴할 건데 그 옵션을 mapTypeOptions로 줌
//   };

//   useEffect(() => {
//     const mapDiv = document.getElementById('map');

//     let mapOptions = {       
//       center: new naver.maps.LatLng(37.5619, 126.9363), // Adjust the center as needed
//       zoom: 15 // Adjust the zoom level as needed}
//     }

//     if(clicked){ // 건물이 클릭되었다면 지도에 들어가는 option을 바꿔서 이미지타입의 지도를 띄움, if문은 그 option을 변경하는 로직

//       mapOptions = {
//       center: new naver.maps.Point(128, 128),
//       zoom: 2,
//       background: '#FFFFFF',
//       mapTypes: new naver.maps.MapTypeRegistry({
//           '+1F': getMapType('1F'),
//           '+2F': getMapType('2F'),
//           '+4F': getMapType('4F'),
//           '+5F': getMapType('5F'),
//       }), // 지도 유형의 컬렉션을 포함하는 객체
//       mapTypeId: '+1F',   // mapTypeId: 초기 지도 유형의 id
//       mapTypeControl: true, //
//       mapTypeControlOptions: {
//           mapTypeIds: ['+1F', '+2F', '+4F', '+5F'],
//           position: naver.maps.Position.BOTTOM_CENTER, // 지도 유형 컨트롤을 배치할 위치.
//           style: naver.maps.MapTypeControlStyle.BUTTON // 지도 유형 컨트롤의 스타일입니다.
//       },
//       zoomControl: true,
//       zoomControlOptions: {
//           position: naver.maps.Position.TOP_RIGHT
//       }
//       }
//     }

//     let map = new naver.maps.Map(mapDiv, mapOptions);  // option을 가지고 지도를 그림, if 문이 실행되면 이미지 타입의 옵션이 mapOption에 들어가고
//                                                        // 아니라면 디폴트로 설정해놓은 옵션이 들어감
//     // let markers = [];

//     // markerDataList.map((markerData)=>  
//     //   markers.push(new naver.maps.Marker({
//     //     position: new naver.maps.LatLng(markerData.latitude, markerData.longitude),
//     //     map: map
//     //     })
//     //   )
//     // )


    
//     // Define polygon coordinates, 빨간 위치로 표시되는 곳의 위치
//     const engineeringHallCoords = [
//       new naver.maps.LatLng(37.5645, 126.9380),
//       new naver.maps.LatLng(37.5645, 126.9390),
//       new naver.maps.LatLng(37.5650, 126.9390),
//       new naver.maps.LatLng(37.5650, 126.9380),
//     ];

//     const scienceHallCoords =[
//       new naver.maps.LatLng(37.564012, 126.938422),
//       new naver.maps.LatLng(37.564012, 126.939433),
//       new naver.maps.LatLng(37.563055, 126.939422),
//       new naver.maps.LatLng(37.563055, 126.938433),
//     ];

//     // Create the polygon , 빨간색으로 표시되는 네모상자를 만듦
//     const engineeringHallPolygon = new naver.maps.Polygon({
//       map: map,
//       paths: engineeringHallCoords,
//       strokeColor: 'red', // Set the stroke color to red
//       strokeOpacity: 0.7,
//       strokeWeight: 2,
//       fillColor: '#FF0000',
//       fillOpacity: 0.3,
//       clickable: true
//     });
//     // 이 네모 상자를 클릭하면 함수가 실행되도록 eventListener를 등록
//     naver.maps.Event.addListener(engineeringHallPolygon, "click", function () {
//       alert('engineeringHallPolygon click');
//       setClickedBuilding(1); 
//       setClicked(true); // Clicked를 true로 바꿔서 useEffect 함수가 실행되도록해서 지도의 옵션을 이미지로 바꾸도록함

//     });

//     // scienceHallPolygon과 여기에 대한 이벤트 리스너를 등록, 위의 engineeringHallPolygon과 똑같은 로직

//     const scienceHallPolygon = new naver.maps.Polygon({
//       map: map,
//       paths: scienceHallCoords,
//       strokeColor: 'red', // Set the stroke color to red
//       strokeOpacity: 0.7,
//       strokeWeight: 2,
//       fillColor: '#FF0000',
//       fillOpacity: 0.3,
//       clickable: true
//     });

    
//     naver.maps.Event.addListener(scienceHallPolygon, "click", function () {
//       alert('scienceHallPolygon click');
//       setClickedBuilding(0);
//       setClicked(true);
//     });

//   }, [clicked]);
// // useEffect 끝, useEffect는 처음 화면이 마운트될때랑 clicked라는 state가 변경될 때마다 실행됨
  

//   return (
//     <div id="map-container">
//       <div id="map" className={clicked+'a'}>
//     </div>
//     <div>
//       {clicked&&<button onClick={()=>{setClicked(false);}}>돌아가기</button>}
//     </div>
//     </div>
//   );
};

export default Map;