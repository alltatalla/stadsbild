angular.module('stadsbild').factory('StruggleInformationService', [ function() {

  var strugglesObj = {};

  strugglesObj.savedStruggles = [
    {
      id : 1,
      shorttitle : "Demonstration mot SvP",
      title : "10.000 demonstrerar mot SvP",
      location : "Kungsträdgården",
      date : "2014-08-04",
      group : "",
      text : "<p>Det som enligt fascistpartiet Svenskarnas Parti (SvP) skulle bli den stora avslutningen på deras valturné kan bäst sammanfattas som ett kvitto på partiets oförmågor och vikten av det motstånd de möter.</p><p>Istället för de 300 personer som de själva hade räknat med enligt sin ansökan om demonstrationstillstånd dök knappt 150 fascister upp, samtidigt fylldes centrala Stockholm till bredden då 10 000 personer dök upp för att visa sin avsky gentemot partiets ideologi.</p><p>Polisnärvaron var som väntat hög, förutom kavalleri, hundar, SPT-fordon, helikoptrar samt ett stort antal ”civila” poliser hade de även i förhand spärrat av stora delar av innerstan med kravallstaket så att fascisterna skulle få promenera ifred.</p>",
      videos : [],
      images : [],
      links : [],
      lat : 59.330387511,
      lng : 18.072016239,
      radius : 100
    },
    {
      id : 2,
      shorttitle : "Stadskamp på NK",
      title : "Invigning av stadskampsveckan på NK",
      location : "Nordiska Kompaniet, Hamngatan",
      date : "2014-04-10",
      group : "Allt åt alla",
      text : "<p>Nytt för i år är att vi valde att förlägga invigningsfesten på Nordiska Kompaniet (NK). </p><p>Stadskampsveckan är fullspäckad av föredrag, aktioner och andra händelser, som påminner oss om att kampen mellan klasserna, mellan de rika och de fattiga, är långt ifrån över, sa invigningstalaren.</p>",
      videos : ["https://www.youtube.com/watch?v=Q4NrprLBuy8"],
      images : ["http://motkraft.net/wp-content/uploads/2014/05/nkaaa3.jpg",
                "http://motkraft.net/wp-content/uploads/2014/05/nkaaa5.jpg",
                "http://motkraft.net/wp-content/uploads/2014/05/nkaaa4.jpg"],
      links : [],
      lat : 59.332762593,
      lng : 18.069527149,
      radius : 50
    },
    {
      id : 3,
      shorttitle :  "Äppelviksvissionen 2030",
      title : "Äppelviksvissionen 2030",
      location : "Äppelviken",
      date : "2014-05-15",
      group : "Allt åt alla",
      text : '<p>Har du varit i Äppelviken?</p><p>På torsdag drar Exproprieringsnämnden på uppdrag av Allt åt Alla till ett av Stockholms mest segregerade bostadsområden - Äppelviken. Under parollen "Förtäta för de täta" informerar vi Äppelviksborna om Exproprieringsnämndens beslut att bygga hyresrätter i området. Vi hoppas att de ska uppskatta möjligheten att dela med sig av sitt generöst tilltagna utrymme.</p><p>Borgaralliansen i Stockholms stad talar sig varma för "blandade upplåtelseformer på bostadsmarknaden", men konstigt nog bara då det gäller att blanda bort gemensamt ägda hyresrätter. Få röster har höjts för att blanda upp och integrera förorter som Äppelviken. Likaså handlar snacket om förtätning alltid om att förtäta i redan tätbebyggda områden, där lekparker och små skogsdungar riskerar att rensas bort.</p><p>För att råda bot på detta presenterar vi härmed Äppelviksvisionen 2030. En vision om att förtäta ett område där det finns gott om grönytor i form av villatomter men ont om hyresrätter. Där män mellan 20 och 64 har en årsmedelinkomst på 812 300 kr (jämfört med kvinnorna som tjänar 475 200 kr i snitt) och där lite mer än hälften av invånarna har en bostad med fem rum eller fler.</p>',
      lat : 59.3267788,
      lng : 17.9787747,
      radius : 400
    },
    {
      id : 4,
      shorttitle : "Cyklopen",
      title : "Kulturhuset Cyklopen",
      location : "Högdalen",
      text : "<p>bla bla bla</p>",
      links : ["http://www.cyklopen.se/"],
      lat : 59.259289,
      lng : 18.041106,
      radius : 80
    },
    {
      id : 5,
      shorttitle : "Kaffé 44",
      title : "Kaffé 44",
      location : "Tjärhovsgatan 46",
      text : "<p>bla bla bla</p>",
      links : ["http://kafe44.org/"],
      lat : 59.31595,
      lng : 18.08280,
      radius : 60
    },

    {
      id : 6,
      shorttitle : "Kaffé Marx",
      title : "Kaffé Marx",
      location : "Kungsgatan 84",
      text : "<p>bla bla bla</p>",
      links : [],
      lat : 59.33202831,
      lng : 18.04741120,
      radius : 80
    }
  ];

  var selectionListeners = [];
  strugglesObj.onSelect = function(callback) {
    selectionListeners.push(callback);
  };

  var selected = null;
  strugglesObj.select = function(id) {
    selected = id;
    for (var i = 0; i < selectionListeners.length; ++i)
      selectionListeners[i](id);
  };

  strugglesObj.selected = function() {
    return selected;
  };

  strugglesObj.getLocation = function(id) {
    locList = strugglesObj.savedStruggles;

    for (i = 0; i < locList.length; ++i) {
      if (locList[i].id === id)
        return locList[i];
    }

    return undefined;
  };

  strugglesObj.getBounds = function(margin) {
    locList = strugglesObj.savedStruggles;
    bounds = { northEast: {
        lat: locList[0].lat,
        lng: locList[0].lng
      },
      southWest: {
        lat: locList[0].lat,
        lng: locList[0].lng
      }};

    for (i = 1; i < locList.length; ++i) {
      bounds.northEast.lat = Math.max(bounds.northEast.lat, locList[i].lat);
      bounds.southWest.lat = Math.min(bounds.southWest.lat, locList[i].lat);

      // This only works on the eastern hemisphere
      bounds.northEast.lng = Math.max(bounds.northEast.lng, locList[i].lng);
      bounds.southWest.lng = Math.min(bounds.southWest.lng, locList[i].lng);
    }

    if (margin) {
      dlat = margin * (bounds.northEast.lat - bounds.southWest.lat);
      dlng = margin * (bounds.northEast.lng - bounds.southWest.lng);

      bounds.northEast.lat += dlat;
      bounds.southWest.lat -= dlat;

      // This only works on the eastern hemisphere
      bounds.northEast.lng += dlng;
      bounds.southWest.lng -= dlng;
    }

    return bounds;
  };

  return strugglesObj;

}]);
