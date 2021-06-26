 let myMap;
  const init = () => {
    myMap = new ymaps.Map("map", {
      center: [55.75147691, 37.59462718],
      zoom: 14,
      controls: []
    });

    const coords = [
      [55.74963739, 37.60389689],
      [55.75866471, 37.58299712],
      [55.74293209, 37.58119468],
      [55.75747893, 37.62359504]
    ];

    const myCollection = new ymaps.GeoObjectCollection({}, {
      draggable: false,
      iconLayout: 'default#image',
      iconImageHref: './img/icons/marker.png',
      iconImageSize: [46, 57],
      iconImageOffset: [-35, -52],
      hintContent: 'Подсказка'
    });

    coords.forEach (coord => {
      myCollection.add(new ymaps.Placemark(coord));
    })

    myMap.geoObjects.add(myCollection);

    myMap.behaviors.disable('scrollZoom');

  };

  ymaps.ready(init);
