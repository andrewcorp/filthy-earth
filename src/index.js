require('./styles/application.scss');

const Elm = require('./app/Main.elm');
const app = Elm.Main.embed(document.querySelector('#app'));

const mapMarkers = [],
      infoWindows = [],
      bounds = new google.maps.LatLngBounds();

const clearMarkers = () => {
  mapMarkers.forEach(marker => marker.setMap(null));
  mapMarkers.length = 0;
}

const createMarker = (d) => {
  const position = new google.maps.LatLng({
    lat: parseInt(d.latitude),
    lng: parseInt(d.longitude)
  });

  const content = `
    <div>
      <h2>${d.name}</h2>
      <h3>${d.city}, ${d.country}</h3>
    </div>
  `;

  const infoWindow = new google.maps.InfoWindow({ content });
  infoWindows.push(infoWindow);

  const marker = new google.maps.Marker({
    position,
    map: window.googleMap,
    title: d.name,
  });

  marker.addListener('click', () => {
    // Close other open windows
    infoWindows.forEach((i) => i.close());
    window.googleMap.panTo(position);
    infoWindow.open(window.googleMap, marker);
  });
  mapMarkers.push(marker);
  bounds.extend(position);
  window.googleMap.fitBounds(bounds);
}

const filterMarkers = (str) => {
  clearMarkers();
  window.data
    .filter((d) => d.name.toLowerCase().indexOf(str.toLowerCase()) !== -1)
    .forEach((d) => createMarker(d, window.googleMap));
}

app.ports.initializeMap.subscribe((p) => {
    const mapDiv = document.getElementById('map');
    window.googleMap = new google.maps.Map(mapDiv, { zoom: 2, center: new google.maps.LatLng(p) });

    // Add markers
    window.data.forEach((d) => createMarker(d));
});

app.ports.filterOn.subscribe((str) => filterMarkers(str));

//Placeholder - need to set up AJAX
window.data = [{"id":1,"name":"Sullivan","city":"Novi Pazar","country":"Serbia","latitude":43.1406976,"longitude":20.5213617},
{"id":2,"name":"Heath","city":"Groblersdal","country":"South Africa","latitude":-25.16575,"longitude":29.38926},
{"id":3,"name":"Dottie","city":"Las Piñas","country":"Philippines","latitude":14.4514337,"longitude":120.9791625},
{"id":4,"name":"Scoville","city":"Lakbok","country":"Indonesia","latitude":-7.40638,"longitude":108.6591293},
{"id":5,"name":"Linden","city":"Chiclayo","country":"Peru","latitude":-6.7765974,"longitude":-79.8442978},
{"id":6,"name":"Mandrake","city":"Liaodian","country":"China","latitude":45.635251,"longitude":127.059878},
{"id":7,"name":"Gina","city":"Täby","country":"Sweden","latitude":59.4935321,"longitude":18.0655876},
{"id":8,"name":"Sloan","city":"Nīkêh","country":"Afghanistan","latitude":33.25,"longitude":69.216667},
{"id":9,"name":"Lillian","city":"Timrå","country":"Sweden","latitude":62.5262505,"longitude":17.4368205},
{"id":10,"name":"Veith","city":"Kelburn","country":"New Zealand","latitude":-41.277848,"longitude":174.7763921},
{"id":11,"name":"Bunting","city":"Del Pilar","country":"Philippines","latitude":14.5030429,"longitude":121.0524334},
{"id":12,"name":"Warrior","city":"Santo Tomás","country":"Colombia","latitude":10.763286,"longitude":-74.756499},
{"id":13,"name":"Schurz","city":"Pulau Pinang","country":"Malaysia","latitude":5.3523231,"longitude":100.3573891},
{"id":14,"name":"East","city":"Bandong","country":"China","latitude":26.108775,"longitude":118.776895},
{"id":15,"name":"Aberg","city":"Lanchkhuti","country":"Georgia","latitude":42.0902225,"longitude":42.0359711},
{"id":16,"name":"Menomonie","city":"Kertai","country":"China","latitude":46.900546,"longitude":124.214976},
{"id":17,"name":"Manufacturers","city":"La Sarrosa","country":"Honduras","latitude":15.2939516,"longitude":-87.8501554},
{"id":18,"name":"Homewood","city":"Saltsjöbaden","country":"Sweden","latitude":59.2916062,"longitude":18.2637328},
{"id":19,"name":"Dunning","city":"Fier-Çifçi","country":"Albania","latitude":"40.71667","longitude":"19.56667"},
{"id":20,"name":"High Crossing","city":"Armenia","country":"Colombia","latitude":4.4721794,"longitude":-75.7255192},
{"id":21,"name":"Fulton","city":"Ribeirão das Neves","country":"Brazil","latitude":-19.7619024,"longitude":-44.0853572},
{"id":22,"name":"Menomonie","city":"Muktāgācha","country":"Bangladesh","latitude":24.7660178,"longitude":90.2561365},
{"id":23,"name":"Village Green","city":"København","country":"Denmark","latitude":55.6828987,"longitude":12.5786568},
{"id":24,"name":"Ilene","city":"Pryluky","country":"Ukraine","latitude":50.5884714,"longitude":32.3875825},
{"id":25,"name":"Rieder","city":"Shelabolikha","country":"Russia","latitude":53.4066765,"longitude":82.6293575},
{"id":26,"name":"Oakridge","city":"Tunggaoen Timur","country":"Indonesia","latitude":"-10.9232","longitude":"122.8283"},
{"id":27,"name":"Susan","city":"Lazaro Cardenas","country":"Mexico","latitude":17.9567646,"longitude":-102.1943485},
{"id":28,"name":"Dawn","city":"Antaparco","country":"Peru","latitude":"-13.07361","longitude":"-74.41194"},
{"id":29,"name":"Shopko","city":"Shangyong","country":"China","latitude":19.199386,"longitude":110.545513},
{"id":30,"name":"Delaware","city":"Sofádes","country":"Greece","latitude":39.335659,"longitude":22.097651},
{"id":31,"name":"Ridgeway","city":"Nguékhokh","country":"Senegal","latitude":14.5179897,"longitude":-17.0096553},
{"id":32,"name":"Carberry","city":"Pitanga","country":"Brazil","latitude":-24.7592533,"longitude":-51.7601166},
{"id":33,"name":"Anhalt","city":"Yushang","country":"China","latitude":37.9611361,"longitude":-122.5021248},
{"id":34,"name":"Basil","city":"Chinch'ŏn","country":"South Korea","latitude":34.933333,"longitude":126.583333},
{"id":35,"name":"Grayhawk","city":"Biñan","country":"Philippines","latitude":14.3160322,"longitude":121.0671937},
{"id":36,"name":"Mallard","city":"Liyang","country":"China","latitude":31.416911,"longitude":119.48421},
{"id":37,"name":"Westend","city":"Sosnovyy Bor","country":"Russia","latitude":56.4459712,"longitude":39.6602235},
{"id":38,"name":"Longview","city":"Kiel","country":"Germany","latitude":54.3418823,"longitude":10.1150681},
{"id":39,"name":"Manley","city":"Marsada","country":"Philippines","latitude":5.976337,"longitude":121.2234268},
{"id":40,"name":"Golf Course","city":"San Alejandro","country":"Philippines","latitude":14.4713275,"longitude":120.8889291},
{"id":41,"name":"Monica","city":"Biasong","country":"Philippines","latitude":10.493002,"longitude":123.713859},
{"id":42,"name":"Dorton","city":"Boston","country":"United States","latitude":42.34,"longitude":-71.05},
{"id":43,"name":"Fairview","city":"Nanyang","country":"China","latitude":32.990664,"longitude":112.528308},
{"id":44,"name":"Oak Valley","city":"Teculután","country":"Guatemala","latitude":14.990034,"longitude":-89.719295},
{"id":45,"name":"Pond","city":"Serere","country":"Uganda","latitude":1.4994033,"longitude":33.5490078},
{"id":46,"name":"High Crossing","city":"Cambé","country":"Brazil","latitude":-23.277052,"longitude":-51.2803152},
{"id":47,"name":"Crescent Oaks","city":"Vicuña","country":"Chile","latitude":-30.0319,"longitude":-70.7081},
{"id":48,"name":"Blue Bill Park","city":"Slovenski Javornik","country":"Slovenia","latitude":46.426574,"longitude":14.0833019},
{"id":49,"name":"Summit","city":"Kindu","country":"Democratic Republic of the Congo","latitude":-2.9492205,"longitude":25.9231471},
{"id":50,"name":"Buena Vista","city":"Rosario","country":"Philippines","latitude":14.5643857,"longitude":121.1293312},
{"id":51,"name":"Hintze","city":"Vichy","country":"France","latitude":"46.1167","longitude":"3.4167"},
{"id":52,"name":"Fisk","city":"Sambilawang","country":"Indonesia","latitude":-7.9822189,"longitude":111.4782661},
{"id":53,"name":"Golden Leaf","city":"San Jose","country":"Mexico","latitude":18.026373,"longitude":-95.514174},
{"id":54,"name":"Helena","city":"Kiaranonggeng","country":"Indonesia","latitude":-7.42566,"longitude":108.14323},
{"id":55,"name":"Redwing","city":"Đưc Trọng","country":"Vietnam","latitude":11.641927,"longitude":108.3102916},
{"id":56,"name":"Carioca","city":"Moreira de Geraz do Lima","country":"Portugal","latitude":41.7130775,"longitude":-8.687644},
{"id":57,"name":"Melrose","city":"Laka","country":"Indonesia","latitude":-6.1560113,"longitude":106.90896},
{"id":58,"name":"Melrose","city":"Gaoleshan","country":"China","latitude":29.67832,"longitude":109.144929},
{"id":59,"name":"Drewry","city":"Proletarskiy","country":"Russia","latitude":56.1029081,"longitude":42.3369006},
{"id":60,"name":"Dwight","city":"San Jacinto","country":"Philippines","latitude":12.5640276,"longitude":123.7304111},
{"id":61,"name":"Schmedeman","city":"Sacramento","country":"United States","latitude":38.58,"longitude":-121.49},
{"id":62,"name":"School","city":"Rayevskaya","country":"Russia","latitude":44.8310092,"longitude":37.5460072},
{"id":63,"name":"Melody","city":"Neundeut","country":"Indonesia","latitude":-6.9861815,"longitude":107.2930419},
{"id":64,"name":"Sachs","city":"Křižanov","country":"Czech Republic","latitude":49.8359632,"longitude":16.795095},
{"id":65,"name":"Grayhawk","city":"Dualing","country":"Philippines","latitude":7.1220009,"longitude":124.5600318},
{"id":66,"name":"Tennyson","city":"Baziqiao","country":"China","latitude":30.9329039,"longitude":121.4518015},
{"id":67,"name":"Tennyson","city":"Puerto Asís","country":"Colombia","latitude":0.5471811,"longitude":-76.1319953},
{"id":68,"name":"Mesta","city":"Mengxi","country":"China","latitude":23.396201,"longitude":103.364905},
{"id":69,"name":"6th","city":"Mulyosari","country":"Indonesia","latitude":-7.1066698,"longitude":110.0196561},
{"id":70,"name":"Summer Ridge","city":"Libon","country":"Philippines","latitude":13.264915,"longitude":123.4256573},
{"id":71,"name":"Fisk","city":"Alajuela","country":"Costa Rica","latitude":10.0165314,"longitude":-84.2184331},
{"id":72,"name":"Novick","city":"Paltamo","country":"Finland","latitude":64.403043,"longitude":27.8381469},
{"id":73,"name":"Shoshone","city":"Jinjiang","country":"China","latitude":24.781681,"longitude":118.552365},
{"id":74,"name":"Pepper Wood","city":"Haixing","country":"China","latitude":38.143169,"longitude":117.497651},
{"id":75,"name":"Fulton","city":"Las Lomas","country":"Panama","latitude":8.4430125,"longitude":-82.3777335},
{"id":76,"name":"Grayhawk","city":"Lambangan Kulon","country":"Indonesia","latitude":-6.8229172,"longitude":111.3545546},
{"id":77,"name":"Nobel","city":"Jamshoro","country":"Pakistan","latitude":25.4427709,"longitude":68.3004492},
{"id":78,"name":"Mesta","city":"Tiling","country":"Philippines","latitude":14.6002303,"longitude":121.0480673},
{"id":79,"name":"Gerald","city":"Waterloo","country":"Canada","latitude":43.4714875,"longitude":-80.5494007},
{"id":80,"name":"Schmedeman","city":"Dan Makham Tia","country":"Thailand","latitude":13.8494172,"longitude":99.408315},
{"id":81,"name":"Beilfuss","city":"Fangli","country":"China","latitude":29.990745,"longitude":121.49591},
{"id":82,"name":"Fairview","city":"Aldeia do Bispo","country":"Portugal","latitude":40.1208803,"longitude":-7.1636797},
{"id":83,"name":"Kenwood","city":"Nagrog","country":"Indonesia","latitude":-6.9927364,"longitude":107.8731968},
{"id":84,"name":"Lighthouse Bay","city":"El Paso","country":"United States","latitude":31.77,"longitude":-106.43},
{"id":85,"name":"Northland","city":"El Coco","country":"Panama","latitude":8.8702881,"longitude":-79.810063},
{"id":86,"name":"Messerschmidt","city":"Fort Liberté","country":"Haiti","latitude":19.6616066,"longitude":-71.8363794},
{"id":87,"name":"Division","city":"Harrisburg","country":"United States","latitude":40.2684396,"longitude":-76.8832658},
{"id":88,"name":"Hallows","city":"Samothráki","country":"Greece","latitude":40.4476834,"longitude":25.5917918},
{"id":89,"name":"Drewry","city":"Sines","country":"Portugal","latitude":37.9571555,"longitude":-8.8608907},
{"id":90,"name":"Mariners Cove","city":"Grzmiąca","country":"Poland","latitude":53.8508917,"longitude":16.4443227},
{"id":91,"name":"Fairfield","city":"Soisy-sous-Montmorency","country":"France","latitude":48.9875598,"longitude":2.2971584},
{"id":92,"name":"Ridgeview","city":"Rousínov","country":"Czech Republic","latitude":49.2012812,"longitude":16.8821522},
{"id":93,"name":"Sutteridge","city":"Aliaga","country":"Philippines","latitude":15.5754812,"longitude":120.7990105},
{"id":94,"name":"Forster","city":"Hengshitang","country":"China","latitude":23.119924,"longitude":113.309317},
{"id":95,"name":"Green Ridge","city":"Paulínia","country":"Brazil","latitude":-22.7712817,"longitude":-47.156739},
{"id":96,"name":"Crowley","city":"Ezhou","country":"China","latitude":30.39194,"longitude":114.894843},
{"id":97,"name":"Lakewood Gardens","city":"Malaya Purga","country":"Russia","latitude":56.5614229,"longitude":52.9958953},
{"id":98,"name":"Lunder","city":"Sobinka","country":"Russia","latitude":56.036667,"longitude":39.9203466},
{"id":99,"name":"Sundown","city":"Linshanhe","country":"China","latitude":30.740553,"longitude":114.893657},
{"id":100,"name":"Raven","city":"Mandiana","country":"Guinea","latitude":10.6172827,"longitude":-8.6985716},
{"id":101,"name":"Hayes","city":"Qinshan","country":"China","latitude":30.643939,"longitude":104.045346},
{"id":102,"name":"Oak Valley","city":"Iwanai","country":"Japan","latitude":42.9786866,"longitude":141.8352113},
{"id":103,"name":"Mitchell","city":"Kaeng Khro","country":"Thailand","latitude":16.1344075,"longitude":102.2090224},
{"id":104,"name":"Spaight","city":"Dongpu","country":"China","latitude":23.113478,"longitude":113.417068},
{"id":105,"name":"Kensington","city":"Aracaju","country":"Brazil","latitude":-10.9162769,"longitude":-37.0520889},
{"id":106,"name":"Cordelia","city":"Adelaide Mail Centre","country":"Australia","latitude":-34.990888,"longitude":138.574391},
{"id":107,"name":"Merry","city":"Kapenguria","country":"Kenya","latitude":1.2481932,"longitude":35.1103736},
{"id":108,"name":"Eagle Crest","city":"Luz de Tavira","country":"Portugal","latitude":37.0914183,"longitude":-7.7047624},
{"id":109,"name":"Clemons","city":"Olival Basto","country":"Portugal","latitude":38.7960995,"longitude":-9.1540186},
{"id":110,"name":"Karstens","city":"Koh Tao","country":"Thailand","latitude":10.1096551,"longitude":99.822979},
{"id":111,"name":"Northwestern","city":"Murmuiža","country":"Latvia","latitude":57.4749779,"longitude":25.491651},
{"id":112,"name":"Luster","city":"Grodków","country":"Poland","latitude":50.69625,"longitude":17.38516},
{"id":113,"name":"Dryden","city":"Blama","country":"Sierra Leone","latitude":7.8726899,"longitude":-11.3402694},
{"id":114,"name":"Mosinee","city":"Columbus","country":"United States","latitude":40.078872,"longitude":-82.9447782},
{"id":115,"name":"Sycamore","city":"Koreiz","country":"Ukraine","latitude":44.4309874,"longitude":34.0789969},
{"id":116,"name":"Bashford","city":"Nuyno","country":"Ukraine","latitude":51.5363109,"longitude":24.8942909},
{"id":117,"name":"Anzinger","city":"Gongping","country":"China","latitude":29.265836,"longitude":103.552514},
{"id":118,"name":"Dottie","city":"Nevel’","country":"Russia","latitude":56.0181995,"longitude":29.9291962},
{"id":119,"name":"Reinke","city":"San Jose","country":"United States","latitude":37.34,"longitude":-121.89},
{"id":120,"name":"Butternut","city":"Estoi","country":"Portugal","latitude":37.0938859,"longitude":-7.8946433},
{"id":121,"name":"Loomis","city":"Castleblayney","country":"Ireland","latitude":54.10269,"longitude":-6.64937},
{"id":122,"name":"Fairview","city":"Sarmanovo","country":"Russia","latitude":55.2519048,"longitude":52.5882232},
{"id":123,"name":"Becker","city":"Bulacan","country":"Philippines","latitude":14.6539775,"longitude":121.0288525},
{"id":124,"name":"Bartelt","city":"Mamu","country":"China","latitude":34.0370771,"longitude":116.1719462},
{"id":125,"name":"Moulton","city":"Rabaul","country":"Papua New Guinea","latitude":-4.1999648,"longitude":152.1644612},
{"id":126,"name":"Heffernan","city":"Mariestad","country":"Sweden","latitude":58.4016114,"longitude":13.8639082},
{"id":127,"name":"Farwell","city":"Huaihua","country":"China","latitude":27.569517,"longitude":110.001922},
{"id":128,"name":"Mitchell","city":"Brandýs nad Labem-Stará Boleslav","country":"Czech Republic","latitude":50.1383356,"longitude":14.6705894},
{"id":129,"name":"Mcguire","city":"Ilangay","country":"Philippines","latitude":6.8954177,"longitude":126.0203934},
{"id":130,"name":"Oxford","city":"Utrecht (stad)","country":"Netherlands","latitude":52.08234,"longitude":5.1175293},
{"id":131,"name":"Loeprich","city":"Buqei‘a","country":"Israel","latitude":"32.97746","longitude":"35.33345"},
{"id":132,"name":"Grover","city":"Nakhabino","country":"Russia","latitude":55.8389853,"longitude":37.1414146},
{"id":133,"name":"Ridge Oak","city":"Yantai","country":"China","latitude":37.464539,"longitude":121.447852},
{"id":134,"name":"Coolidge","city":"Sukajadi","country":"Indonesia","latitude":-6.8903936,"longitude":107.5889804},
{"id":135,"name":"Iowa","city":"Kawangkoan","country":"Indonesia","latitude":1.205329,"longitude":124.7826},
{"id":136,"name":"Dahle","city":"Köln","country":"Germany","latitude":50.9648271,"longitude":6.9538234},
{"id":137,"name":"Oak","city":"Cuijiamatou","country":"China","latitude":"39.07472","longitude":"117.30056"},
{"id":138,"name":"Monument","city":"Tajinan","country":"Indonesia","latitude":-8.0503973,"longitude":112.6794582},
{"id":139,"name":"Mcguire","city":"Skulsk","country":"Poland","latitude":52.4817381,"longitude":18.3311713},
{"id":140,"name":"Briar Crest","city":"Serra","country":"Portugal","latitude":41.0534668,"longitude":-8.3490278},
{"id":141,"name":"Petterle","city":"Sidi Bouzid","country":"Tunisia","latitude":35.0354386,"longitude":9.4839392},
{"id":142,"name":"Vermont","city":"Skalbmierz","country":"Poland","latitude":50.3197113,"longitude":20.3992492},
{"id":143,"name":"Summit","city":"Jalālpur","country":"Pakistan","latitude":32.7436286,"longitude":74.2751428},
{"id":144,"name":"Mockingbird","city":"Lyon","country":"France","latitude":43.0429124,"longitude":1.9038837},
{"id":145,"name":"Algoma","city":"Zdíkov","country":"Czech Republic","latitude":49.0648694,"longitude":13.6889288},
{"id":146,"name":"Johnson","city":"Chicago","country":"United States","latitude":41.7429283,"longitude":-87.7123355},
{"id":147,"name":"North","city":"Cijambe","country":"Indonesia","latitude":-6.6242048,"longitude":107.775465},
{"id":148,"name":"Kinsman","city":"Tukuyu","country":"Tanzania","latitude":-9.2538202,"longitude":33.6483471},
{"id":149,"name":"Brentwood","city":"Taotang","country":"China","latitude":23.3362272,"longitude":112.7222244},
{"id":150,"name":"Bartillon","city":"Yangsha","country":"China","latitude":24.466675,"longitude":112.626495},
{"id":151,"name":"Melvin","city":"Ilići","country":"Bosnia and Herzegovina","latitude":43.3564826,"longitude":17.7458559},
{"id":152,"name":"Sunnyside","city":"Itamaraju","country":"Brazil","latitude":-17.0656965,"longitude":-39.734338},
{"id":153,"name":"Hudson","city":"Trollhättan","country":"Sweden","latitude":58.261515,"longitude":12.2964905},
{"id":154,"name":"Huxley","city":"Opi","country":"Nigeria","latitude":6.7702718,"longitude":7.4300234},
{"id":155,"name":"Drewry","city":"Solo","country":"Philippines","latitude":14.0158972,"longitude":121.3404269},
{"id":156,"name":"Vidon","city":"Zhongchuan","country":"China","latitude":36.515,"longitude":103.62},
{"id":157,"name":"Hudson","city":"Babahoyo","country":"Ecuador","latitude":-1.801926,"longitude":-79.5346459},
{"id":158,"name":"Sherman","city":"Boguchwała","country":"Poland","latitude":49.997292,"longitude":21.9314509},
{"id":159,"name":"Laurel","city":"Gardēz","country":"Afghanistan","latitude":33.6042793,"longitude":69.2281531},
{"id":160,"name":"Dottie","city":"Curahuasi","country":"Peru","latitude":-13.5426013,"longitude":-72.6967861},
{"id":161,"name":"Arrowood","city":"Alingsås","country":"Sweden","latitude":57.8593919,"longitude":12.4331389},
{"id":162,"name":"Tomscot","city":"Šibenik","country":"Croatia","latitude":45.8174856,"longitude":17.1851},
{"id":163,"name":"Kim","city":"Romba","country":"Indonesia","latitude":-8.9066345,"longitude":121.3064286},
{"id":164,"name":"Hauk","city":"Dimona","country":"Israel","latitude":31.069419,"longitude":35.033363},
{"id":165,"name":"Vera","city":"Akita Shi","country":"Japan","latitude":35.7412836,"longitude":140.5951813},
{"id":166,"name":"Northland","city":"Mýto","country":"Czech Republic","latitude":49.794097,"longitude":12.5783985},
{"id":167,"name":"Northland","city":"Tartouss","country":"Syria","latitude":34.8959276,"longitude":35.8866517},
{"id":168,"name":"Eastwood","city":"North York","country":"Canada","latitude":43.7543283,"longitude":-79.4422593},
{"id":169,"name":"Corscot","city":"Jönköping","country":"Sweden","latitude":57.778556,"longitude":14.1619341},
{"id":170,"name":"Amoth","city":"Zhangtan","country":"China","latitude":29.963494,"longitude":118.331054},
{"id":171,"name":"Hanover","city":"Durham","country":"United States","latitude":36.0038131,"longitude":-78.9387241},
{"id":172,"name":"Schurz","city":"Dīvāndarreh","country":"Iran","latitude":35.9136535,"longitude":47.0266848},
{"id":173,"name":"Nancy","city":"Yinjiaxi","country":"China","latitude":29.135219,"longitude":110.4185},
{"id":174,"name":"Fieldstone","city":"Kučevo","country":"Serbia","latitude":44.4846365,"longitude":21.6706559},
{"id":175,"name":"Hagan","city":"Coromandel","country":"Brazil","latitude":-18.4785912,"longitude":-47.1978694},
{"id":176,"name":"Portage","city":"Amiens","country":"France","latitude":49.8905368,"longitude":2.3081396},
{"id":177,"name":"Stuart","city":"Shaami-Yurt","country":"Russia","latitude":43.2261193,"longitude":45.3885257},
{"id":178,"name":"Towne","city":"Bei’an","country":"China","latitude":48.239135,"longitude":126.481867},
{"id":179,"name":"Briar Crest","city":"Armenta","country":"Honduras","latitude":15.5724296,"longitude":-88.0350859},
{"id":180,"name":"Mcguire","city":"Cahuac","country":"Peru","latitude":-9.8535874,"longitude":-76.631796},
{"id":181,"name":"Susan","city":"Banjar Bau Kawan","country":"Indonesia","latitude":-5.456385,"longitude":122.612261},
{"id":182,"name":"Arrowood","city":"Enköping","country":"Sweden","latitude":59.6517905,"longitude":17.0779098},
{"id":183,"name":"Del Sol","city":"El Pino","country":"Honduras","latitude":15.7193344,"longitude":-86.9173327},
{"id":184,"name":"Texas","city":"Hagondange","country":"France","latitude":49.25362,"longitude":6.16417},
{"id":185,"name":"Magdeline","city":"Villazón","country":"Bolivia","latitude":-22.0853991,"longitude":-65.5975218},
{"id":186,"name":"Old Shore","city":"Měnín","country":"Czech Republic","latitude":49.075615,"longitude":16.6855513},
{"id":187,"name":"Comanche","city":"Blyznyuky","country":"Ukraine","latitude":48.8568191,"longitude":36.5499896},
{"id":188,"name":"Dennis","city":"Lucun","country":"China","latitude":33.9230243,"longitude":-84.3150822},
{"id":189,"name":"Dovetail","city":"Noyemberyan","country":"Armenia","latitude":41.1718057,"longitude":44.9946631},
{"id":190,"name":"Maple Wood","city":"Jasper Park Lodge","country":"Canada","latitude":52.8861365,"longitude":-118.0572366},
{"id":191,"name":"Buena Vista","city":"Artémida","country":"Greece","latitude":37.9703906,"longitude":24.0077427},
{"id":192,"name":"Norway Maple","city":"Kashira","country":"Russia","latitude":54.8095591,"longitude":38.2516419},
{"id":193,"name":"Jay","city":"Leuweheq","country":"Indonesia","latitude":"-8.2284","longitude":"123.7414"},
{"id":194,"name":"Novick","city":"Hongdun","country":"China","latitude":38.253338,"longitude":109.503758},
{"id":195,"name":"Bayside","city":"Huancaray","country":"Peru","latitude":-13.77085,"longitude":-73.536636},
{"id":196,"name":"Fallview","city":"Bajia","country":"China","latitude":21.941555,"longitude":111.426122},
{"id":197,"name":"Bay","city":"Skalat","country":"Ukraine","latitude":49.4285053,"longitude":25.9712877},
{"id":198,"name":"Glendale","city":"Banjar Medura","country":"Indonesia","latitude":"-8.6926","longitude":"115.2533"},
{"id":199,"name":"Browning","city":"Gaoshi","country":"China","latitude":29.184943,"longitude":105.055945},
{"id":200,"name":"Petterle","city":"Kajisara","country":"Indonesia","latitude":"-6.87792","longitude":"115.50689"}]
