const buildings = {
    'engineeringHall':['+1F','+2F'],
    'engineeringHall2':['+1F','+2F','+3F'],
    'engineeringHall3':['+1F','+2F'],
    'scienceHall':['+1F','+2F']
    
    
  } 

const engineeringHallCoords = [
    new naver.maps.LatLng(37.561373, 126.935655),
    new naver.maps.LatLng(37.561152, 126.936519),
    new naver.maps.LatLng(37.562329, 126.936987),
    new naver.maps.LatLng(37.562518, 126.936001),
];

const engineeringHall2Coords = [
  new naver.maps.LatLng(37.562538, 126.934734),
  new naver.maps.LatLng(37.562338, 126.934680),
  new naver.maps.LatLng(37.562155, 126.935627),
  new naver.maps.LatLng(37.562353, 126.935710),
];

const engineeringHall3Coords = [
  new naver.maps.LatLng(37.561732, 126.934640), 
  new naver.maps.LatLng(37.561948, 126.934678),
  new naver.maps.LatLng(37.561740, 126.935646),
  new naver.maps.LatLng(37.561559, 126.935595),

];

const scienceHallCoords =[
    new naver.maps.LatLng(37.563944, 126.934048),
    new naver.maps.LatLng(37.563768, 126.934907),
    new naver.maps.LatLng(37.564018, 126.935523),
    new naver.maps.LatLng(37.564231, 126.935602),
    new naver.maps.LatLng(37.564482, 126.934452),
  ];

 

export {buildings,engineeringHallCoords,scienceHallCoords,engineeringHall2Coords,engineeringHall3Coords}