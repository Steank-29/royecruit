import React, { useEffect, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Alert, Avatar, Backdrop, Snackbar,  Button, FormControl, Grid, InputLabel, Link, MenuItem, Select, Tab, Tabs, TextField, IconButton, CircularProgress } from '@mui/material';
import { Typewriter } from 'react-simple-typewriter';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CheckIcon from '@mui/icons-material/Check';



const countries = [
    { name: 'Afghanistan', flag: '🇦🇫', states: ['Badakhshan', 'Badghis', 'Baghlan', 'Balkh', 'Bamyan', 'Daykundi', 'Farah', 'Faryab', 'Ghazni', 'Ghor', 'Helmand', 'Herat', 'Jowzjan', 'Kabul', 'Kandahar', 'Kapisa', 'Khost', 'Kunar', 'Kunduz', 'Laghman', 'Logar', 'Maidan Wardak', 'Nangarhar', 'Nimruz', 'Nuristan', 'Paktia', 'Paktika', 'Panjshir', 'Parwan', 'Samangan', 'Sar-e Pol', 'Takhar', 'Urozgan', 'Zabul'] },
    { name: 'Albania', flag: '🇦🇱', states: ['Berat', 'Dibër', 'Durrës', 'Elbasan', 'Fier', 'Gjirokastër', 'Korçë', 'Kukës', 'Lezhë', 'Shkodër', 'Tiranë', 'Vlorë']},
    { name: 'Algeria', flag: '🇩🇿', states: ['Adrar', 'Aïn Defla', 'Aïn Témouchent', 'Algiers', 'Annaba', 'Batna', 'Béchar', 'Béjaïa', 'Biskra', 'Blida', 'Bordj Bou Arréridj', 'Bouira', 'Boumerdès', 'Chlef', 'Constantine', 'Djelfa', 'El Bayadh', 'El Oued', 'El Tarf', 'Ghardaïa', 'Guelma', 'Illizi', 'Jijel', 'Khenchela', 'Laghouat', 'Mascara', 'Médéa', 'Mila', 'Mostaganem', 'Msila', 'Naâma', 'Oran', 'Ouargla', 'Oum El Bouaghi', 'Relizane', 'Saïda', 'Sétif', 'Sidi Bel Abbès', 'Skikda', 'Souk Ahras', 'Tamanghasset', 'Tébessa', 'Tiaret', 'Tindouf', 'Tipaza', 'Tissemsilt', 'Tizi Ouzou', 'Tlemcen']},
    { name: 'American Samoa', flag: '🇦🇸',states: ['Eastern District', 'Manua District', 'Rose Island', 'Swains Island', 'Western District']  },
    { name: 'Andorra', flag: '🇦🇩', states: ['Andorra la Vella', 'Canillo', 'Encamp', 'Escaldes-Engordany', 'La Massana', 'Ordino', 'Sant Julià de Lòria'] },
    { name: 'Angola', flag: '🇦🇴', states: ['Bengo', 'Benguela', 'Bié', 'Cabinda', 'Cuando Cubango', 'Cuanza Norte', 'Cuanza Sul', 'Cunene', 'Huambo', 'Huíla', 'Luanda', 'Lunda Norte', 'Lunda Sul', 'Malanje', 'Moxico', 'Namibe', 'Uíge', 'Zaire'] },
    { name: 'Anguilla', flag: '🇦🇮', states:['Anguilla']  },
    { name: 'Antarctica', flag: '🇦🇶', states:['Antarctica']  },
    { name: 'Antigua and Barbuda', flag: '🇦🇬', states: ['Antigua', 'Barbuda'] },
    { name: 'Argentina', flag: '🇦🇷', states: ['Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán'] },
    { name: 'Armenia', flag: '🇦🇲', states: ['Aragatsotn', 'Ararat', 'Armavir', 'Gegharkunik', 'Kotayk', 'Lori', 'Shirak', 'Syunik', 'Tavush', 'Vayots Dzor', 'Yerevan'] },
    { name: 'Aruba', flag: '🇦🇼', states:['Aruba']  },
    { name: 'Australia', flag: '🇦🇺', states: ['Australian Capital Territory', 'New South Wales', 'Northern Territory', 'Queensland', 'South Australia', 'Tasmania', 'Victoria', 'Western Australia']},
    { name: 'Austria', flag: '🇦🇹', states: [
        'Burgenland',
        'Carinthia',
        'Lower Austria',
        'Upper Austria',
        'Salzburg',
        'Styria',
        'Tyrol',
        'Vorarlberg',
        'Vienna'
      ]  },
    { name: 'Azerbaijan', flag: '🇦🇿', states: [
        'Absheron',
        'Agdam',
        'Agdash',
        'Aghjabadi',
        'Agstafa',
        'Agsu',
        'Astara',
        'Baku',
        'Balakan',
        'Barda',
        'Beylagan',
        'Bilasuvar',
        'Dashkasan',
        'Fuzuli',
        'Ganja',
        'Gobustan',
        'Goychay',
        'Goygol',
        'Hajigabul',
        'Imishli',
        'Ismailli',
        'Jabrayil',
        'Jalilabad',
        'Khachmaz',
        'Khizi',
        'Khojali',
        'Kurdamir',
        'Lachin',
        'Lankaran',
        'Lankaran',
        'Lerik',
        'Masally',
        'Mingachevir',
        'Nakhchivan Autonomous Republic',
        'Neftchala',
        'Oghuz',
        'Qabala',
        'Qakh',
        'Qazakh',
        'Quba',
        'Qubadli',
        'Qusar',
        'Saatly',
        'Sabirabad',
        'Shabran',
        'Shaki',
        'Shaki City',
        'Shirvan',
        'Siazan',
        'Sumqayit',
        'Tartar',
        'Tovuz',
        'Ujar',
        'Yardymli',
        'Yevlakh',
        'Yevlakh City',
        'Zangilan',
        'Zaqatala',
        'Zardab'
      ]   },
    { name: 'Bahamas', flag: '🇧🇸', states: [
        'Acklins Island',
        'Andros Island',
        'Berry Islands',
        'Bimini',
        'Cat Island',
        'Crooked Island',
        'Eleuthera',
        'Exuma',
        'Grand Bahama',
        'Inagua',
        'Long Island',
        'Mayaguana',
        'New Providence',
        'Ragged Island',
        'Rum Cay',
        'San Salvador'
      ]  },
    { name: 'Bahrain', flag: '🇧🇭', states: [
        'Capital Governorate',
        'Central Governorate',
        'Muharraq Governorate',
        'Northern Governorate',
        'Southern Governorate'
      ]  },
    { name: 'Bangladesh', flag: '🇧🇩' ,states: ['Barisal', 'Chittagong', 'Dhaka', 'Khulna', 'Rajshahi', 'Rangpur', 'Sylhet'] },
    { name: 'Barbados', flag: '🇧🇧', states: ['Christ Church', 'Saint Andrew', 'Saint George', 'Saint James', 'Saint John', 'Saint Joseph', 'Saint Lucy', 'Saint Michael', 'Saint Peter', 'Saint Philip', 'Saint Thomas'] },
    { name: 'Belarus', flag: '🇧🇾', states: ['Brest Region', 'Gomel Region', 'Grodno Region', 'Minsk', 'Minsk Region', 'Mogilev Region', 'Vitebsk Region'] },
    { name: 'Belgium', flag: '🇧🇪', states: ['Brussels-Capital Region', 'Flanders', 'Wallonia'] },
    { name: 'Belize', flag: '🇧🇿', states: ['Belize', 'Cayo', 'Corozal', 'Orange Walk', 'Stann Creek', 'Toledo'] },
    { name: 'Benin', flag: '🇧🇯', states:['Alibori', 'Atakora', 'Atlantique', 'Borgou', 'Collines', 'Donga', 'Kouffo', 'Littoral', 'Mono', 'Ouémé', 'Plateau', 'Zou'] },
    { name: 'Bermuda', flag: '🇧🇲', states: ['Devonshire', 'Hamilton', 'Hamilton Parish', 'Paget', 'Pembroke', 'Saint George', 'Saint Georges Parish', 'Sandys', 'Smiths Parish', 'Southampton', 'Warwick']},
    { name: 'Bhutan', flag: '🇧🇹', states: ['Bumthang', 'Chhukha', 'Dagana', 'Gasa', 'Haa', 'Lhuentse', 'Mongar', 'Paro', 'Pemagatshel', 'Punakha', 'Samdrup Jongkhar', 'Samtse', 'Sarpang', 'Thimphu', 'Trashigang', 'Trongsa', 'Tsirang', 'Wangdue Phodrang', 'Zhemgang']},
    { name: 'Bolivia', flag: '🇧🇴', states: ['Beni', 'Chuquisaca', 'Cochabamba', 'La Paz', 'Oruro', 'Pando', 'Potosí', 'Santa Cruz', 'Tarija']},
    { name: 'Bosnia and Herzegovina', flag: '🇧🇦', states: ['Bosnian Podrinje Canton', 'Central Bosnia Canton', 'Federation of Bosnia and Herzegovina', 'Herzegovina-Neretva Canton', 'Posavina Canton', 'Republika Srpska', 'Sarajevo Canton', 'Tuzla Canton', 'Una-Sana Canton', 'West Herzegovina Canton', 'Zenica-Doboj Canton']},
    { name: 'Botswana', flag: '🇧🇼', states:  ['Central District', 'Gaborone', 'Ghanzi District', 'Kgalagadi District', 'Kgatleng District', 'Kweneng District', 'North-East District', 'North-West District', 'South-East District', 'Southern District']},
    { name: 'Brazil', flag: '🇧🇷' , states: ['Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Espírito Santo', 'Federal District', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins']},
    { name: 'British Indian Ocean Territory', flag: '🇮🇴', states: ['Diego Garcia']},
    { name: 'British Virgin Islands', flag: '🇻🇬' , states: ['Anegada', 'Jost Van Dyke', 'Tortola', 'Virgin Gorda'] },
    { name: 'Brunei', flag: '🇧🇳' , states:['Brunei']},
    { name: 'Bulgaria', flag: '🇧🇬' , states: [
        'Blagoevgrad',
        'Burgas',
        'Dobrich',
        'Gabrovo',
        'Jambol',
        'Khaskovo',
        'Kjustendil',
        'Kurdzhali',
        'Kyustendil',
        'Lovech',
        'Montana',
        'Pazardzhik',
        'Pernik',
        'Pleven',
        'Plovdiv',
        'Razgrad',
        'Ruse',
        'Shumen',
        'Silistra',
        'Sliven',
        'Smolyan',
        'Sofia',
        'Sofia-Grad',
        'Stara Zagora',
        'Targovishte',
        'Varna',
        'Veliko Tarnovo',
        'Vidin',
        'Vratsa',
        'Yambol'
      ]},
    { name: 'Burkina Faso', flag: '🇧🇫' , states: [
        'Boucle du Mouhoun',
        'Cascades',
        'Centre',
        'Centre-Est',
        'Centre-Nord',
        'Centre-Ouest',
        'Centre-Sud',
        'Est',
        'Hauts-Bassins',
        'Nord',
        'Plateau-Central',
        'Sahel',
        'Sud-Ouest'
      ]},
    { name: 'Burundi', flag: '🇧🇮' , states: [
        'Bubanza',
        'Bujumbura Mairie',
        'Bujumbura Rural',
        'Bururi',
        'Cankuzo',
        'Cibitoke',
        'Gitega',
        'Karuzi',
        'Kayanza',
        'Kirundo',
        'Makamba',
        'Muramvya',
        'Muyinga',
        'Mwaro',
        'Ngozi',
        'Rumonge',
        'Rutana',
        'Ruyigi'
      ]},
    { name: 'Cambodia', flag: '🇰🇭' , states: ['Banteay Meanchey', 'Battambang', 'Kampong Cham', 'Kampong Chhnang', 'Kampong Speu', 'Kampot', 'Kandal', 'Kep', 'Koh Kong', 'Kratié', 'Mondulkiri', 'Phnom Penh', 'Preah Vihear', 'Prey Veng', 'Pursat', 'Ratanakiri', 'Siem Reap', 'Sihanoukville', 'Stung Treng', 'Svay Rieng', 'Takeo', 'Tboung Khmum'] },
    { name: 'Cameroon', flag: '🇨🇲', states: ['Adamaoua', 'Centre', 'East', 'Far North', 'Littoral', 'North', 'Northwest', 'South', 'Southwest', 'West'] },  
    { name: 'Canada', flag: '🇨🇦' , states: ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon'] },     
    { name: 'Cape Verde', flag: '🇨🇻' , states: ['Barlavento Islands', 'Boa Vista', 'Brava', 'Maio', 'Mosteiros', 'Paul', 'Porto Novo', 'Praia', 'Ribeira Brava', 'Ribeira Grande', 'Sal', 'Santa Catarina', 'Santa Cruz', 'São Domingos', 'São Filipe', 'São Miguel', 'São Vicente', 'Sotavento Islands', 'Tarrafal'] },     
    { name: 'Cayman Islands', flag: '🇰🇾' , states: ['George Town', 'West Bay', 'Bodden Town', 'North Side', 'East End', 'Sister Islands'] },      
    { name: 'Central African Republic', flag: '🇨🇫', states: ['Bamingui-Bangoran', 'Bangui', 'Basse-Kotto', 'Haut-Mbomou', 'Haute-Kotto', 'Kemo', 'Lobaye', 'Mambéré-Kadéï', 'Mbomou', 'Nana-Grébizi', 'Nana-Mambéré', 'Ombella-M`Poko', 'Ouaka', 'Ouham', 'Ouham-Pendé', 'Sangha-Mbaéré', 'Vakaga'] },      
    { name: 'Chad', flag: '🇹🇩' , states: ['Bahr el Gazel', 'Batha', 'Borkou', 'Chari-Baguirmi', 'Ennedi', 'Guéra', 'Hadjer-Lamis', 'Kanem', 'Lac', 'Logone Occidental', 'Logone Oriental', 'Mandoul', 'Mayo-Kebbi East', 'Mayo-Kebbi West', 'Moyen-Chari', 'N`Djamena', 'Ouaddaï', 'Salamat', 'Sila', 'Tandjilé', 'Tibesti', 'Wadi Fira'] },
    { name: 'Chile', flag: '🇨🇱' , states: ['Arica y Parinacota', 'Tarapacá', 'Antofagasta', 'Atacama', 'Coquimbo', 'Valparaíso', 'Metropolitana de Santiago', 'Libertador General Bernardo O’Higgins', 'Maule', 'Ñuble', 'Biobío', 'Araucanía', 'Los Ríos', 'Los Lagos', 'Aysén', 'Magallanes y la Antártica Chilena']},
    { name: 'China', flag: '🇨🇳' , states: ['Anhui', 'Beijing', 'Chongqing', 'Fujian', 'Gansu', 'Guangdong', 'Guangxi', 'Guizhou', 'Hainan', 'Hebei', 'Heilongjiang', 'Henan', 'Hong Kong', 'Hubei', 'Hunan', 'Inner Mongolia', 'Jiangsu', 'Jiangxi', 'Jilin', 'Liaoning', 'Macau', 'Ningxia', 'Qinghai', 'Shaanxi', 'Shandong', 'Shanghai', 'Shanxi', 'Sichuan', 'Taiwan', 'Tianjin', 'Tibet', 'Xinjiang', 'Yunnan', 'Zhejiang']},
    { name: 'Christmas Island', flag: '🇨🇽', states: ['Christmas Island'] },
    { name: 'Cocos Islands', flag: '🇨🇨' , states:  ['Cocos (Keeling) Islands']},
    { name: 'Colombia', flag: '🇨🇴' , states: ['Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda', 'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca', 'Vaupés', 'Vichada']},
    { name: 'Comoros', flag: '🇰🇲' , states: ['Anjouan', 'Grande Comore', 'Mohéli']},
    { name: 'Cook Islands', flag: '🇨🇰' , states:['Cook Islands']},
    { name: 'Costa Rica', flag: '🇨🇷' , states:['San José', 'Alajuela', 'Cartago', 'Heredia', 'Guanacaste', 'Puntarenas','Limón']},
    { name: 'Croatia', flag: '🇭🇷' , states:['Bjelovarsko-Bilogorska', 'Brodsko-Posavska', 'Dubrovačko-Neretvanska', 'Istarska', 'Karlovačka', 'Koprivničko-križevačka', 'Krapinsko-zagorska', 'Ličko-senjska', 'Međimurska', 'Osječko-baranjska', 'Požeško-slavonska', 'Primorsko-goranska', 'Sisačko-moslavačka', 'Splitsko-dalmatinska', 'Šibensko-kninska', 'Varaždinska', 'Virovitičko-podravska', 'Vukovarsko-srijemska', 'Zadarska', 'Zagrebačka', 'Grad Zagreb']},
    { name: 'Cuba', flag: '🇨🇺' , states:['Cuba']},
    { name: 'Curacao', flag: '🇨🇼' , states:['Willemstad', 'Curacao']},
    { name: 'Cyprus', flag: '🇨🇾' , states:['Nicosia', 'Limassol', 'Larnaca', 'Famagusta', 'Paphos', 'Kyrenia']},
    { name: 'Czech Republic', flag: '🇨🇿' , states:['Prague', 'Central Bohemia', 'South Bohemia', 'Plzen', 'Karlovy Vary ', 'Usti nad Labem ', 'Liberec ', 'Hradec Kralove ', 'Pardubice ', 'Olomouc ', 'Moravian-Silesian ', 'South Moravian ',' Zlin ']},
    { name: 'Democratic Republic of the Congo', flag: '🇨🇩', states:['Bandundu',
        'Bas-Congo',
        'Equateur',
        'Kasai-Occidental',
        'Kasai-Oriental',
        'Katanga',
        'Kinshasa',
        'Maniema',
        'Nord-Kivu',
        'Orientale',
        'Sud-Kivu'] },
    { name: 'Denmark', flag: '🇩🇰' , states:['Capital Region',
        'Central Denmark Region',
        'North Denmark Region',
        'Region of Southern Denmark']},
    { name: 'Djibouti', flag: '🇩🇯' , states:['Ali Sabieh Region',
        'Arta Region',
        'Dikhil Region',
        'Djibouti Region',
        'Obock Region',
        'Tadjourah Region']},
    { name: 'Dominica', flag: '🇩🇲' , states:['Saint Andrew Parish',
        'Saint David Parish',
        'Saint George Parish',
        'Saint John Parish',
        'Saint Joseph Parish',
        'Saint Luke Parish',
        'Saint Mark Parish',
        'Saint Patrick Parish']},
    { name: 'Dominican Republic', flag: '🇩🇴', states:['Distrito Nacional (Santo Domingo)',
        'Azua',
        'Baoruco',
        'Barahona',
        'Dajabón',
        'Duarte',
        'Elías Piña',
        'El Seibo',
        'Espaillat',
        'Hato Mayor',
        'Hermanas Mirabal',
        'Independencia',
        'La Altagracia',
        'La Romana',
        'La Vega',
        'María Trinidad Sánchez',
        'Monseñor Nouel',
        'Monte Cristi',
        'Monte Plata',
        'Pedernales',
        'Peravia',
        'Puerto Plata',
        'Samaná',
        'Sánchez Ramírez',
        'San Cristóbal',
        'San José de Ocoa',
        'San Juan',
        'San Pedro de Macorís',
        'Santiago',
        'Santiago Rodríguez',
        'Santo Domingo',
        'Valverde'] },
    { name: 'East Timor', flag: '🇹🇱', states : ['East Timor'] },
    { name: 'Ecuador', flag: '🇪🇨', states: [
        "Azuay",
        "Bolívar",
        "Cañar",
        "Carchi",
        "Chimborazo",
        "Cotopaxi",
        "El Oro",
        "Esmeraldas",
        "Galápagos",
        "Guayas",
        "Imbabura",
        "Loja",
        "Los Ríos",
        "Manabí",
        "Morona Santiago",
        "Napo",
        "Orellana",
        "Pastaza",
        "Pichincha",
        "Santa Elena",
        "Santo Domingo de los Tsáchilas",
        "Sucumbíos",
        "Tungurahua",
        "Zamora Chinchipe"
      ] },
    { name: 'Egypt', flag: '🇪🇬', states: [
        "Alexandria",
        "Aswan",
        "Asyut",
        "Beheira",
        "Beni Suef",
        "Cairo",
        "Dakahlia",
        "Damietta",
        "Faiyum",
        "Gharbia",
        "Giza",
        "Ismailia",
        "Kafr El Sheikh",
        "Luxor",
        "Matruh",
        "Minya",
        "Monufia",
        "New Valley",
        "North Sinai",
        "Port Said",
        "Qalyubia",
        "Qena",
        "Red Sea",
        "Sharqia",
        "Sohag",
        "South Sinai",
        "Suez"
      ]},
    { name: 'El Salvador', flag: '🇸🇻', states: ['Ahuchapán', 'Cabañas', 'Chalatenango', 'Cuscatlán', 'La Libertad', 'La Paz', 'La Unión', 'Morazán', 'San Miguel', 'San Salvador', 'Santa Ana', 'San Vicente', 'Sonsonate', 'Usulután'] },
    { name: 'Equatorial Guinea', flag: '🇬🇶', states: [
        'Annobón',
        'Bioko Norte',
        'Bioko Sur',
        'Centro Sur',
        'Kié-Ntem',
        'Litoral',
        'Wele-Nzas'] },
    { name: 'Eritrea', flag: '🇪🇷', states : ['Anseba',
    'Debub',
    'Gash-Barka',
    'Maekel',
    'Northern Red Sea',
    'Southern Red Sea'] },
    { name: 'Estonia', flag: '🇪🇪', states: ['Harju',
    'Hiiu',
    'Ida-Viru',
    'Järva',
    'Jõgeva',
    'Lääne',
    'Lääne-Viru',
    'Põlva',
    'Pärnu',
    'Rapla',
    'Saare',
    'Tartu',
    'Valga',
    'Viljandi',
    'Võru'] },
    { name: 'Ethiopia', flag: '🇪🇹', states: ['Afar', 'Amhara', 'Benishangul-Gumuz', 'Dire Dawa', 'Gambela', 'Harari', 'Oromia', 'Somali', 'Tigray'] },
    { name: 'Falkland Islands', flag: '🇫🇰', states: ['East Falkland' , 'West Falkland'] },
    { name: 'Faroe Islands', flag: '🇫🇴', states: ['Faroe Islands'] },
    { name: 'Fiji', flag: '🇫🇯', states:['Central',
        'Eastern',
        'Northern',
        'Rotuma',
        'Western'] },
    { name: 'Finland', flag: '🇫🇮', states: ['Åland Islands',
        'Lapland',
        'North Ostrobothnia',
        'Kainuu',
        'North Karelia',
        'Northern Savonia',
        'Central Finland',
        'South Ostrobothnia',
        'Ostrobothnia',
        'South Karelia',
        'Southern Ostrobothnia',
        'Southern Savonia',
        'Tavastia Proper',
        'Uusimaa',
        'Päijänne Tavastia',
        'Kymenlaakso',
        'Pirkanmaa',
        'Satakunta'] },
    { name: 'France', flag: '🇫🇷' , states: ['Auvergne-Rhône-Alpes',
        'Bourgogne-Franche-Comté',
        'Brittany',
        'Centre-Val de Loire',
        'Corsica',
        'Grand Est',
        'Hauts-de-France',
        'Île-de-France',
        'Normandy',
        'Nouvelle-Aquitaine',
        'Occitanie',
        'Pays de la Loire',
        'Provence-Alpes-Côte d`Azur',
        'Guadeloupe',
        'Martinique' ,
        'Guyane' ,
        'Réunion' ,
        'Mayotte']},
    { name: 'French Polynesia', flag: '🇵🇫', states:['Austral Islands',
        'Gambier Islands',
       ' Marquesas Islands',
        'Society Islands',
        'Tuamotu Archipelago'] },
    { name: 'Gabon', flag: '🇬🇦' , states: ['Estuaire', 'Haut-Ogooué', 'Moyen-Ogooué', 'Ngounié', 'Nyanga', 'Ogooué-Ivindo', 'Ogooué-Lolo', 'Ogooué-Maritime',  'Woleu-Ntem']},
    { name: 'Gambia', flag: '🇬🇲', states: [ 'Banjul', 'Central River', 'Lower River','North Bank', 'Upper River'] },
    { name: 'Georgia', flag: '🇬🇪', states: ['Guria', 'Imereti', 'Kakheti', 'Kvemo Kartli', 'Mtskheta-Mtianeti', 'Racha-Lechkhumi' , 'Kvemo Svaneti', 'Samegrelo-Zemo Svaneti', 'Samtskhe-Javakheti',  'Shida Kartli' ,'Abkhazia' , 'Adjara']},
    { name: 'Germany', flag: '🇩🇪', states: ['Baden-Württemberg', 'Bayern', 'Berlin', 'Brandenburg', 'Bremen', 'Hamburg', 'Hessen' , 'Mecklenburg-Vorpommern', 'Niedersachsen', 'Nordrhein-Westfalen' , 'Rheinland-Pfalz', 'Saarland', 'Sachsen', 'Sachsen-Anhalt', 'Schleswig-Holstein', 'Thüringen'] },
    { name: 'Ghana', flag: '🇬🇭', states: ['Ahafo', 'Ashanti', 'Bono', 'Bono East', 'Central', 'Eastern', 'Greater Accra', 'North East', 'Northern', 'Oti', 'Savannah', 'Upper East', 'Upper West', 'Volta', 'Western', 'Western North'] },
    { name: 'Gibraltar', flag: '🇬🇮', states: ['Gibraltar'] },
    { name: 'Greece', flag: '🇬🇷', states: ['Attica', 'Central Greece', 'Central Macedonia', 'Crete', 'East Macedonia and Thrace', 'Epirus', 'Ionian Islands', 'North Aegean', 'Peloponnese', 'South Aegean', 'Thessaly', 'West Greece', 'West Macedonia'] },
    { name: 'Greenland', flag: '🇬🇱', states: ['Kujalleq', 'Qeqertalik', 'Qeqqata', 'Avannaata'] },
    { name: 'Grenada', flag: '🇬🇩', states: ['Saint Andrew', 'Saint David', 'Saint George', 'Saint John', 'Saint Mark', 'Saint Patrick'] },
    { name: 'Guam', flag: '🇬🇺', states: ['Agana Heights', 'Agat', 'Asan-Maina', 'Barrigada', 'Chalan Pago-Ordot', 'Dededo', 'Hagåtña', 'Inarajan', 'Mangilao', 'Merizo', 'Mongmong-Toto-Maite', 'Piti', 'Santa Rita', 'Sinajana', 'Talofofo', 'Tamuning', 'Umatac', 'Yigo', 'Yona'] },
    { name: 'Guatemala', flag: '🇬🇹', states: ['Alta Verapaz', 'Baja Verapaz', 'Chimaltenango', 'Chiquimula', 'El Progreso', 'Escuintla', 'Guatemala', 'Huehuetenango', 'Izabal', 'Jalapa', 'Jutiapa', 'Petén', 'Quetzaltenango', 'Quiché', 'Retalhuleu', 'Sacatepéquez', 'San Marcos', 'Santa Rosa', 'Sololá', 'Suchitepéquez', 'Totonicapán', 'Zacapa'] },
    { name: 'Guernsey', flag: '🇬🇬', states: ['Guernsey'] },
    { name: 'Guinea', flag: '🇬🇳', states: ['Boké', 'Conakry', 'Faranah', 'Kankan', 'Kindia', 'Labé', 'Mamou', 'Nzérékoré'] },
    { name: 'Guinea-Bissau', flag: '🇬🇼', states: ['Bafatá', 'Biombo', 'Bissau', 'Bolama-Bijagos', 'Cacheu', 'Gabú', 'Oio', 'Quinara'] },
    { name: 'Guyana', flag: '🇬🇾', states: ['Barima-Waini', 'Cuyuni-Mazaruni', 'Demerara-Mahaica', 'East Berbice-Corentyne', 'Essequibo Islands-West Demerara', 'Mahaica-Berbice', 'Pomeroon-Supenaam', 'Potaro-Siparuni', 'Upper Demerara-Berbice', 'Upper Takutu-Upper Essequibo'] },
    { name: 'Haiti', flag: '🇭🇹', states: ['Artibonite', 'Centre', 'Grand`Anse', 'Nippes', 'Nord', 'Nord-Est', 'Nord-Ouest', 'Ouest', 'Sud', 'Sud-Est'] },
    { name: 'Honduras', flag: '🇭🇳', states: ['Atlántida', 'Choluteca', 'Colón', 'Comayagua', 'Copán', 'Cortés', 'El Paraíso',' Francisco Morazán', 'Gracias a Dios', 'Intibucá', 'Islas de la Bahía', 'La Paz', 'Lempira', 'Ocotepeque', 'Olancho', 'Santa Bárbara', 'Valle', 'Yoro'] },
    { name: 'Hong Kong', flag: '🇭🇰', states: ['Hong Kong Island', 'Kowloon', 'New Territories', 'Outlying Islands'] },
    { name: 'Hungary', flag: '🇭🇺', states: ['Bács-Kiskun', 'Baranya', 'Békés', 'Borsod-Abaúj-Zemplén', 'Budapest', 'Csongrád', 'Fejér', 'Győr-Moson-Sopron', 'Hajdú-Bihar', 'Heves', 'Jász-Nagykun-Szolnok', 'Komárom-Esztergom', 'Nógrád', 'Pest', 'Somogy', 'Szabolcs-Szatmár-Bereg', 'Tolna', 'Vas', 'Veszprém', 'Zala'] },
    { name: 'Iceland', flag: '🇮🇸', states: ['Capital Region', 'Southern Peninsula', 'Western Region', 'Westfjords', 'Northwest Region', 'Northeast Region', 'East Region', 'South Region'] },
    { name: 'India', flag: '🇮🇳', states: ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',' Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'] },
    { name: 'Indonesia', flag: '🇮🇩', states: [ 'Aceh', 'Bali', 'Bangka Belitung Islands', 'Banten', 'Bengkulu', 'Central Java', 'Central Kalimantan', 'Central Sulawesi', 'East Java', 'East Kalimantan', 'East Nusa Tenggara', 'Gorontalo', 'Jakarta', 'Jambi', 'Lampung', 'Maluku', 'North Kalimantan', 'North Maluku',' North Sulawesi', 'North Sumatra', 'Papua', 'Riau', 'Riau Islands', 'South Kalimantan', 'South Sulawesi', 'South Sumatra', 'Southeast Sulawesi', 'West Java', 'West Kalimantan', 'West Nusa Tenggara', 'West Papua', 'West Sulawesi', 'West Sumatra', 'Yogyakarta'] },
    { name: 'Iran', flag: '🇮🇷', states: ['Alborz', 'Ardabil', 'Bushehr', 'Chaharmahal and Bakhtiari', 'East Azerbaijan', 'Isfahan', 'Fars', 'Gilan', 'Golestan', 'Hamadan', 'Hormozgan', 'Ilam', 'Kerman', 'Kermanshah', 'Khuzestan', 'Kohgiluyeh and Boyer-Ahmad', 'Kurdistan', 'Lorestan', 'Markazi', 'Mazandaran', 'North Khorasan', 'Qazvin', 'Qom', 'Razavi Khorasan', 'Semnan', 'Sistan and Baluchestan', 'South Khorasan', 'Tehran', 'Yazd',  'Zanjan'] },
    { name: 'Iraq', flag: '🇮🇶', states: ['Al Anbar', 'Al-Qadisiyah', 'Babil', 'Baghdad', 'Basra', 'Dhi Qar', 'Diyala', 'Dohuk', 'Erbil', 'Karbala', 'Kirkuk', 'Maysan', 'Muthanna', 'Najaf', 'Nineveh', 'Salah al-Din', 'Sulaymaniyah', 'Wasit', 'Halabja'] },
    { name: 'Ireland', flag: '🇮🇪', states: ['Connacht', 'Leinster', 'Munster', 'Ulster'] },
    { name: 'Isle of Man', flag: '🇮🇲', states: ['Isle of Man'] },
    { name: 'Italy', flag: '🇮🇹', states: ['Abruzzo', 'Basilicata', 'Calabria', 'Campania', 'Emilia-Romagna', 'Friuli-Venezia Giulia', 'Lazio', 'Liguria', 'Lombardy', 'Marche', 'Molise', 'Piedmont', 'Apulia', 'Sardinia', 'Sicily', 'Tuscany', 'Trentino-Alto Adige/Südtirol', 'Umbria', 'Aosta Valley', 'Veneto'] },
    { name: 'Ivory Coast', flag: '🇨🇮', states: ['Agnéby',
        'Bafing',
        'Bas-Sassandra',
        'Comoé',
        'Denguélé',
        'Dix-Huit Montagnes',
        'Fromager',
        'Gôh',
        'Haut-Sassandra',
        'Lacs',
        'Lagunes',
        'Marahoué',
        'Montagnes',
        'Moyen-Cavally',
        'Moyen-Comoé',
        'N`zi-Comoé',
        'Savanes',
        'Sud-Bandama',
        'Sud-Comoé',
        'Vallée du Bandama',
        'Woroba',
        'Zanzan',
        'Abidjan',
        'Yamoussoukro',
        'Bounkani',
        'Gbôklé',
        'Indénié-Djuablin',
        'Kabadougou',
        'La Mé',
        'Lebelo-Bouli',
        'Nawa'] },
    { name: 'Jamaica', flag: '🇯🇲', states: ['Clarendon', 'Hanover', 'Kingston', 'Manchester', 'Portland', 'Saint Andrew', 'Saint Ann', 'Saint Catherine', 'Saint Elizabeth', 'Saint James', 'Saint Mary', 'Saint Thomas', 'Trelawny', 'Westmoreland'] },
    { name: 'Japan', flag: '🇯🇵', states: ['Aichi', 'Akita', 'Aomori', 'Chiba', 'Ehime', 'Fukui', 'Fukuoka', 'Fukushima', 'Gifu', 'Gunma', 'Hiroshima', 'Hokkaido', 'Hyogo', 'Ibaraki', 'Ishikawa', 'Iwate', 'Kagawa', 'Kagoshima', 'Kanagawa', 'Kochi', 'Kumamoto', 'Kyoto', 'Mie', 'Miyagi', 'Miyazaki', 'Nagano', 'Nagasaki', 'Nara', 'Niigata', 'Oita', 'Okayama', 'Okinawa', 'Osaka', 'Saga', 'Saitama', 'Shiga', 'Shimane', 'Shizuoka', 'Tochigi', 'Tokushima', 'Tokyo', 'Tottori', 'Toyama', 'Wakayama', 'Yamagata', 'Yamaguchi', 'Yamanashi'] },
    { name: 'Jordan', flag: '🇯🇴', states: ['Ajloun', 'Amman', 'Aqaba', 'Balqa', 'Irbid', 'Jerash', 'Karak', 'Madaba', 'Ma`an', 'Mafraq', 'Tafilah', 'Zarqa'] },
    { name: 'Kazakhstan', flag: '🇰🇿', states: ['Akmola', 'Aktobe', 'Almaty', 'Astana', 'Almaty', 'Atyrau', 'East Kazakhstan', 'Jambyl', 'Karaganda', 'Kostanay', 'Kyzylorda', 'Mangystau', 'North Kazakhstan', 'Pavlodar', 'South Kazakhstan', 'West Kazakhstan'] },
    { name: 'Kenya', flag: '🇰🇪', states: ['Baringo', 'Bomet', 'Bungoma', 'Busia', 'Elgeyo-Marakwet', 'Embu', 'Garissa', 'Homa Bay', 'Isiolo', 'Kajiado', 'Kakamega', 'Kericho', 'Kiambu', 'Kilifi', 'Kirinyaga', 'Kisii', 'Kisumu', 'Kitui', 'Kwale', 'Laikipia', 'Lamu', 'Machakos', 'Makueni', 'Mandera', 'Marsabit', 'Meru', 'Migori', 'Mombasa', 'Murang`a', 'Nairobi', 'Nakuru', 'Nandi', 'Narok', 'Nyamira', 'Nyandarua', 'Nyeri', 'Samburu', 'Siaya', 'Taita-Taveta', 'Tana River', 'Tharaka-Nithi', 'Trans-Nzoia', 'Turkana', 'Uasin Gishu', 'Vihiga', 'Wajir', 'West Pokot'] },
    { name: 'Kiribati', flag: '🇰🇮', states: ['the Gilbert Islands', 'the Phoenix Islands', 'the Line Islands'] },
    { name: 'Kosovo', flag: '🇽🇰', states: ['Kosovo'] },
    { name: 'Kuwait', flag: '🇰🇼', states: ['Al Ahmadi', 'Al Farwaniyah', 'Al Jahra', 'Capital', 'Hawalli', 'Mubarak Al-Kabeer'] },
    { name: 'Kyrgyzstan', flag: '🇰🇬', states: ['Batken',
    'Chuy',
    'Issyk-Kul',
    'Jalal-Abad',
    'Naryn',
    'Osh',
    'Talas',
    'Ysyk-Kol'] },
    { name: 'Laos', flag: '🇱🇦', states: ['Attapeu',
    'Bokeo',
    'Bolikhamsai',
    'Champasak',
    'Houaphanh',
    'Khammouane',
    'Luang Namtha',
    'Luang Prabang',
    'Oudomxay',
    'Phongsaly',
    'Sainyabuli',
    'Salavan',
    'Savannakhet',
    'Sekong',
    'Vientiane',
    'Vientiane Prefecture',
    'Xaisomboun',
    'Xekong',
    'Xiangkhoang'] },
    { name: 'Latvia', flag: '🇱🇻', states: ['Aizkraukle',
    'Aluksne',
    'Balvi',
    'Bauska',
    'Cēsis',
    'Daugavpils',
    'Dobele',
    'Gulbene',
    'Jēkabpils',
    'Jelgava',
    'Krāslava',
    'Kuldīga',
    'Liepāja',
    'Limbaži',
    'Ludza',
    'Madona',
    'Ogre',
    'Preiļi',
    'Rēzekne',
    'Rīga',
    'Saldus',
    'Talsi',
    'Tukums',
    'Valka',
    'Valmiera',
    'Ventspils'] },
    { name: 'Lebanon', flag: '🇱🇧', states: ['Beqaa',
    'Beirut',
    'Mount Lebanon',
    'Nabatieh',
    'North Lebanon',
    'South Lebanon'] },
    { name: 'Lesotho', flag: '🇱🇸', states: ['Berea',
    'Butha-Buthe',
    'Leribe',
    'Mafeteng',
    'Maseru',
    "Mohale's Hoek",
    "Qacha's Nek",
    'Quthing',
    'Thaba-Tseka'] },
    { name: 'Liberia', flag: '🇱🇷', states: ['Bomi',
    'Bong',
    'Gbarpolu',
    'Grand Bassa',
    'Grand Cape Mount',
    'Grand Gedeh',
    'Grand Kru',
    'Lofa',
    'Margibi',
    'Maryland',
    'Montserrado',
    'Nimba',
    'Rivercess',
    'River Gee',
    'Sinoe'] },
    { name: 'Libya', flag: '🇱🇾', states: ['Tripoli',
    'Jafara',
    'Zawiya',
    'Misratah',
    'Al Marqab',
    'Al Jufra',
    'Wadi Al Shatii',
    'Sabha',
    'Murzuq',
    'Kufra',
    'Benghazi',
    'Al Wahat',
    'Al Kufrah',
    'Derna',
    'Al Butnan',
    'Tobruk',
    'Al Wahat',
    'Nalut',
    'Gharyan',
    'Zintan',
    'Yafran',
    'Sirte'] },
    { name: 'Liechtenstein', flag: '🇱🇮', states: ['Balzers',
    'Eschen',
    'Gamprin',
    'Mauren',
    'Planken',
    'Ruggell',
    'Schaan',
    'Schellenberg',
    'Triesen',
    'Triesenberg',
    'Vaduz'] },
    { name: 'Lithuania', flag: '🇱🇹', states: ['Alytus County',
    'Kaunas County',
    'Klaipėda County',
    'Marijampolė County',
    'Panevėžys County',
    'Šiauliai County',
    'Tauragė County',
    'Telšiai County',
    'Utena County',
    'Vilnius County'] },
    { name: 'Luxembourg', flag: '🇱🇺', states: ['Luxembourg District', 'Diekirch District', 'Grevenmacher District'] },
    { name: 'Macao', flag: '🇲🇴', states: ['Macao'] },
    { name: 'Madagascar', flag: '🇲🇬', states: ['Antananarivo', 'Antsiranana', 'Fianarantsoa', 'Mahajanga', 'Toamasina', 'Toliara'] },
    { name: 'Malawi', flag: '🇲🇼', states: ['Central Region', 'Northern Region', 'Southern Region'] },
    { name: 'Malaysia', flag: '🇲🇾', states: ['Johor', 'Kedah', 'Kelantan', 'Kuala Lumpur', 'Labuan', 'Melaka', 'Negeri Sembilan', 'Pahang', 'Perak', 'Perlis', 'Penang', 'Sabah', 'Sarawak', 'Selangor', 'Terengganu'] },
    { name: 'Maldives', flag: '🇲🇻', states: ['Alifu', 'Baa', 'Dhaalu', 'Faafu', 'Gaafu Alifu', 'Gaafu Dhaalu', 'Gnaviyani', 'Haa Alifu', 'Haa Dhaalu', 'Kaafu', 'Laamu', 'Lhaviyani', 'Maale', 'Meemu', 'Noonu', 'Raa', 'Seenu', 'Shaviyani', 'Thaa', 'Vaavu'] },
    { name: 'Mali', flag: '🇲🇱', states: ['Bamako', 'Gao', 'Kayes', 'Kidal', 'Koulikoro', 'Mopti', 'Segou', 'Sikasso', 'Tombouctou'] },
    { name: 'Malta', flag: '🇲🇹', states: ['Gozo and Comino', 'Malta'] },
    { name: 'Marshall Islands', flag: '🇲🇭', states: ['Ailinglaplap', 'Ailuk', 'Arno', 'Aur', 'Bikini', 'Ebon', 'Enewetak', 'Jabat', 'Jaluit', 'Kili', 'Kwajalein', 'Lae', 'Lib', 'Likiep', 'Majuro', 'Maloelap', 'Mejit', 'Mili', 'Namorik', 'Namu', 'Rongelap', 'Ujae', 'Ujelang', 'Wotho'] },
    { name: 'Mauritania', flag: '🇲🇷', states: ['Adrar', 'Assaba', 'Brakna', 'Dakhlet Nouadhibou', 'Gorgol', 'Guidimaka', 'Hodh Ech Chargui', 'Hodh El Gharbi', 'Inchiri', 'Nouakchott Nord', 'Nouakchott Ouest', 'Nouakchott Sud', 'Tagant', 'Tiris Zemmour', 'Trarza'] },
    { name: 'Mauritius', flag: '🇲🇺', states: ['Agalega Islands', 'Black River', 'Cargados Carajos Shoals', 'Flacq', 'Grand Port', 'Moka', 'Pamplemousses', 'Plaines Wilhems', 'Port Louis', 'Rivière du Rempart', 'Rodrigues', 'Savanne'] },
    { name: 'Mayotte', flag: '🇾🇹', states: ['Dzaoudzi', 'Mamoudzou', 'Bandraboua', 'Bandrele', 'Chiconi', 'Chirongui', 'Dembeni', 'Kani-Kéli', 'Koungou', 'M`Tsangamouji', 'Mamoudzou III'] },
    { name: 'Mexico', flag: '🇲🇽', states: ['Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua', 'Coahuila', 'Colima', 'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Mexico City', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'] },
    { name: 'Micronesia', flag: '🇫🇲', states: ['Chuuk', 'Kosrae', 'Pohnpei', 'Yap'] },
    { name: 'Moldova', flag: '🇲🇩', states: ['Atoţi', 'Anenii Noi', 'Bălţi', 'Basarabeasca', 'Bender (Tighina)', 'Briceni', 'Cahul', 'Călăraşi', 'Cantemir', 'Căuşeni', 'Ceadîr-Lunga', 'Chişinău', 'Cimişlia', 'Criuleni', 'Donduşeni', 'Drochia', 'Dubăsari', 'Edineţ', 'Făleşti', 'Floreşti', 'Gagauzia', 'Glodeni', 'Hînceşti', 'Ialoveni', 'Leova', 'Nisporeni', 'Ocniţa', 'Orhei', 'Rezina', 'Rîşcani', 'Sîngerei', 'Soroca', 'Străşeni', 'Şoldăneşti', 'Ştefan Vodă', 'Taraclia', 'Teleneşti', 'Transnistria', 'Ungheni'] },
    { name: 'Monaco', flag: '🇲🇨', states: ['Monaco-Ville', 'Monte-Carlo', 'La Condamine'] },
    { name: 'Mongolia', flag: '🇲🇳', states: ['Arkhangai', 'Bayan-Ölgii', 'Bayankhongor', 'Bulgan', 'Darkhan-Uul','Dornod', 'Dornogovi', 'Dundgovi', 'Gobi-Altai', 'Govi-Altai', 'Govisümber', 'Khentii', 'Khovd', 'Khövsgöl', 'Ömnögovi', 'Orkhon', 'Övörkhangai', 'Selenge', 'Sükhbaatar', 'Töv', 'Uvs'] },
    { name: 'Montenegro', flag: '🇲🇪', states: ['Andrijevica', 'Bar', 'Berane', 'Bijelo Polje', 'Budva', 'Cetinje', 'Danilovgrad', 'Gusinje', 'Herceg Novi', 'Kolašin', 'Kotor', 'Mojkovac', 'Nikšić', 'Old Royal Capital Cetinje', 'Petnjica', 'Plav', 'Pljevlja', 'Plužine', 'Podgorica', 'Rožaje', 'Šavnik', 'Tivat', 'Ulcinj'] },
    { name: 'Montserrat', flag: '🇲🇸', states: ['Montserrat'] },
    {
        name: 'Montserrat',
        flag: '🇲🇸',
        states: ['Saint Anthony', 'Saint Georges', 'Saint Peter']
      },
      {
        name: 'Morocco',
        flag: '🇲🇦',
        states: ['Tanger-Tetouan-Al Hoceima', 'Oriental', 'Fès-Meknès', 'Rabat-Salé-Kénitra', 'Béni Mellal-Khénifra', 'Casablanca-Settat', 'Marrakech-Safi', 'Drâa-Tafilalet', 'Souss-Massa', 'Guelmim-Oued Noun', 'Laâyoune-Sakia El Hamra', 'Dakhla-Oued Ed-Dahab']
      },
      {
        name: 'Mozambique',
        flag: '🇲🇿',
        states: ['Cabo Delgado', 'Gaza', 'Inhambane', 'Manica', 'Maputo', 'Nampula', 'Niassa', 'Sofala', 'Tete', 'Zambézia']
      },
      {
        name: 'Myanmar',
        flag: '🇲🇲',
        states: ['Ayeyarwady', 'Bago', 'Chin', 'Kachin', 'Kayah', 'Kayin', 'Magway', 'Mandalay', 'Mon', 'Naypyidaw Union Territory', 'Rakhine', 'Sagaing', 'Shan', 'Tanintharyi', 'Yangon']
      },
      {
        name: 'Namibia',
        flag: '🇳🇦',
        states: ['Erongo', 'Hardap', 'Karas', 'Kavango East', 'Kavango West', 'Khomas', 'Kunene', 'Ohangwena', 'Omaheke', 'Omusati', 'Oshana', 'Oshikoto', 'Otjozondjupa', 'Zambezi']
      },
      {
        name: 'Nauru',
        flag: '🇳🇷',
        states: ['Aiwo', 'Anabar', 'Anetan', 'Anibare', 'Baiti', 'Boe', 'Buada', 'Denigomodu', 'Ewa', 'Ijuw', 'Meneng', 'Nibok', 'Uaboe', 'Yaren']
      },
      {
        name: 'Nepal',
        flag: '🇳🇵',
        states: ['Province No. 1', 'Province No. 2', 'Bagmati Province', 'Gandaki Province', 'Lumbini Province', 'Karnali Province', 'Sudurpashchim Province']
      },
      {
        name: 'Netherlands',
        flag: '🇳🇱',
        states: ['Drenthe', 'Flevoland', 'Friesland', 'Gelderland', 'Groningen', 'Limburg', 'Noord-Brabant', 'Noord-Holland', 'Overijssel', 'Utrecht', 'Zeeland', 'Zuid-Holland']
      },
      {
        name: 'New Caledonia',
        flag: '🇳🇨',
        states: ['Loyalty Islands Province', 'North Province', 'South Province'] },
        {
            name: 'New Zealand',
            flag: '🇳🇿',
            states: ['Northland', 'Auckland', 'Waikato', 'Bay of Plenty', 'Gisborne', 'Hawke\'s Bay', 'Taranaki', 'Manawatu-Wanganui', 'Wellington', 'Tasman', 'Nelson', 'Marlborough', 'West Coast', 'Canterbury', 'Otago', 'Southland']
          },
          {
            name: 'Nicaragua',
            flag: '🇳🇮',
            states: ['Boaco', 'Carazo', 'Chinandega', 'Chontales', 'Estelí', 'Granada', 'Jinotega', 'León', 'Madriz', 'Managua', 'Masaya', 'Matagalpa', 'Nueva Segovia', 'Rivas', 'Río San Juan']
          },
          {
            name: 'Niger',
            flag: '🇳🇪',
            states: ['Agadez', 'Diffa', 'Dosso', 'Maradi', 'Niamey', 'Tahoua', 'Tillabéri', 'Zinder']
          },
          {
            name: 'Nigeria',
            flag: '🇳🇬',
            states: ['Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Federal Capital Territory', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara']
          },
          {
            name: 'Niue',
            flag: '🇳🇺',
            states: ['Niue']
          },
          {
            name: 'Norfolk Island',
            flag: '🇳🇫',
            states: ['Norfolk Island']
          },
          {
            name: 'North Korea',
            flag: '🇰🇵',
            states: ['Chagang Province', 'North Hamgyong Province', 'South Hamgyong Province', 'North Hwanghae Province', 'South Hwanghae Province', 'Kangwon Province', 'Pyongyang', 'Ryanggang Province']
          },
    { name: 'North Macedonia', flag: '🇲🇰', states: ['Eastern', 'Northeastern', 'Pelagonia', 'Polog', 'Skopje', 'Southeastern', 'Southwestern', 'Vardar'] },
    { name: 'Northern Mariana Islands', flag: '🇲🇵', states: ['Northern Islands', 'Rota', 'Saipan', 'Tinian'] },
    { name: 'Norway', flag: '🇳🇴', states: ['Viken', 'Innlandet', 'Vestfold og Telemark', 'Agder', 'Vestland', 'Rogaland', 'Møre og Romsdal', 'Trøndelag', 'Nordland', 'Troms og Finnmark'] },
    { name: 'Oman', flag: '🇴🇲', states: ['Ad Dakhiliyah', 'Al Batinah North', 'Al Batinah South', 'Al Buraimi', 'Al Wusta', 'Ash Sharqiyah North', 'Ash Sharqiyah South', 'Dhofar', 'Muscat'] },
    { name: 'Pakistan', flag: '🇵🇰', states: ['Azad Jammu and Kashmir', 'Balochistan', 'Gilgit-Baltistan', 'Khyber Pakhtunkhwa', 'Punjab', 'Sindh', 'Islamabad'] },
    { name: 'Palau', flag: '🇵🇼', states: ['Aimeliik', 'Airai', 'Angaur', 'Hatohobei', 'Kayangel', 'Koror', 'Melekeok', 'Ngaraard', 'Ngarchelong', 'Ngardmau', 'Ngatpang', 'Ngchesar', 'Ngeremlengui', 'Ngiwal', 'Peleliu', 'Sonsorol'] },
    { name: 'Palestine', flag: '🇵🇸', states: ['West Bank', 'Gaza Strip'] },
    { name: 'Panama', flag: '🇵🇦', states: ['Bocas del Toro', 'Chiriqui', 'Cocle', 'Colon', 'Darien', 'Herrera', 'Los Santos', 'Panama', 'Veraguas', 'Guna Yala', 'Embera', 'Wounaan', 'Ngabe-Bugle'] },
    { name: 'Papua New Guinea', flag: '🇵🇬', states: ['Bougainville', 'Central', 'Chimbu', 'Eastern Highlands', 'East New Britain', 'East Sepik', 'Enga', 'Gulf', 'Hela', 'Jiwaka', 'Madang', 'Manus', 'Milne Bay', 'Morobe', 'National Capital District (Port Moresby)', 'New Ireland', 'Northern', 'Western', 'Sandaun (West Sepik)', 'Southern Highlands', 'Western Highlands'] },
    { name: 'Paraguay', flag: '🇵🇾', states: ['Alto Paraguay', 'Alto Paraná', 'Amambay', 'Boquerón', 'Caaguazú', 'Caazapá', 'Canindeyú', 'Central', 'Concepción', 'Cordillera', 'Guairá', 'Itapúa', 'Misiones', 'Ñeembucú', 'Paraguarí', 'Presidente Hayes', 'San Pedro'] },
    { name: 'Peru', flag: '🇵🇪', states: ['Amazonas', 'Áncash', 'Apurímac', 'Arequipa', 'Ayacucho', 'Cajamarca', 'Callao', 'Cusco', 'Huancavelica', 'Huánuco', 'Ica', 'Junín', 'La Libertad', 'Lambayeque', 'Lima', 'Loreto', 'Madre de Dios', 'Moquegua', 'Pasco', 'Piura', 'Puno', 'San Martín', 'Tacna', 'Tumbes', 'Ucayali'] },
    { name: 'Philippines', flag: '🇵🇭', states: ['Ilocos Region', 'Cagayan Valley', 'Central Luzon', 'CALABARZON', 'MIMAROPA', 'Bicol Region', 'Western Visayas', 'Central Visayas', 'Eastern Visayas', 'Zamboanga Peninsula', 'Northern Mindanao', 'Davao Region', 'SOCCSKSARGEN', 'Caraga', 'Bangsamoro'] },
    { name: 'Pitcairn Islands', flag: '🇵🇳', states: ['Pitcairn Islands'] },
    { name: 'Poland', flag: '🇵🇱', states: ['Greater Poland', 'Kuyavian-Pomeranian', 'Lesser Poland', 'Łódź', 'Lower Silesian', 'Lublin', 'Lubusz', 'Masovian', 'Opole', 'Podlaskie', 'Pomeranian', 'Silesian', 'Subcarpathian', 'Warmian-Masurian',  'West Pomeranian'] },
    { name: 'Portugal', flag: '🇵🇹', states: ['Norte', 'Centro', 'Lisbon' , 'Tagus Valley', 'Alentejo', 'Algarve', 'Azores and Madeira'] },
    { name: 'Puerto Rico', flag: '🇵🇷', states: ['Puerto Rico'] },
    { name: 'Qatar', flag: '🇶🇦', states: ['Ad Dawhah', 'Al Wakrah', 'Al Khawr', 'Madinat ash Shamal', 'Al Rayyan', 'Al Daayen', 'Umm Salal', 'Al Khor'] },
    { name: 'Réunion', flag: '🇷🇪', states: ['Réunion'] },
    { name: 'Romania', flag: '🇷🇴', states: [
        'Alba',
        'Arad',
        'Argeș',
        'Bacău',
        'Bihor',
        'Bistrița-Năsăud',
        'Botoșani',
        'Brașov',
        'Brăila',
        'Buzău',
        'Caraș-Severin',
        'Călărași',
        'Cluj',
        'Constanța',
        'Covasna',
        'Dâmbovița',
        'Dolj',
        'Galați',
        'Giurgiu',
        'Gorj',
        'Harghita',
        'Hunedoara',
        'Ialomița',
        'Iași',
        'Ilfov',
        'Maramureș',
        'Mehedinți',
        'Mureș',
        'Neamț',
        'Olt',
        'Prahova',
        'Satu Mare',
        'Sălaj',
        'Sibiu',
        'Suceava',
        'Teleorman',
        'Timiș',
        'Tulcea',
        'Vaslui',
        'Vâlcea',
        'Vrancea',
        'Bucharest'
      ] },
    { name: 'Russia', flag: '🇷🇺', states: ['Republic of Adygea',
    'Altai Krai',
    'Altai Republic',
    'Amur Oblast',
    'Arkhangelsk Oblast',
    'Astrakhan Oblast',
    'Republic of Bashkortostan',
    'Belgorod Oblast',
    'Bryansk Oblast',
    'Republic of Buryatia',
    'Chechen Republic',
    'Chelyabinsk Oblast',
    'Chukotka Autonomous Okrug',
    'Chuvash Republic',
    'Republic of Crimea',
    'Republic of Dagestan',
    'Federal City of Moscow',
    'Republic of Ingushetia',
    'Irkutsk Oblast',
    'Ivanovo Oblast',
    'Jewish Autonomous Oblast',
    'Kabardino-Balkar Republic',
    'Kaliningrad Oblast',
    'Kaluga Oblast',
    'Kamchatka Krai',
    'Karachay-Cherkess Republic',
    'Republic of Karelia',
    'Kemerovo Oblast',
    'Khabarovsk Krai',
    'Republic of Khakassia',
    'Khanty-Mansi Autonomous Okrug',
    'Kirov Oblast',
    'Komi Republic',
    'Kostroma Oblast',
    'Krasnodar Krai',
    'Krasnoyarsk Krai',
    'Kurgan Oblast',
    'Kursk Oblast',
    'Leningrad Oblast',
    'Lipetsk Oblast',
    'Magadan Oblast',
    'Mari El Republic',
    'Republic of Mordovia',
    'Moscow Oblast',
    'Murmansk Oblast',
    'Nenets Autonomous Okrug',
    'Nizhny Novgorod Oblast',
    'North Ossetia-Alania Republic','Novgorod Oblast', 'Novosibirsk Oblast', 'Omsk Oblast', 'Orenburg Oblast', 'Oryol Oblast', 'Penza Oblast', 'Perm Krai', 'Primorsky Krai', 'Pskov Oblast', 'Rostov Oblast', 'Ryazan Oblast', 'Sakha', 'Sakhalin Oblast', 'Samara Oblast', 'Saratov Oblast', 'Sevastopol', 'Smolensk Oblast', 'Stavropol Krai', 'Sverdlovsk Oblast', 'Tambov Oblast', 'Tatarstan', 'Tomsk Oblast', 'Tula Oblast', 'Tuva Republic', 'Tver Oblast', 'Tyumen Oblast', 'Udmurtia', 'Ulyanovsk Oblast', 'Vladimir Oblast', 'Volgograd Oblast', 'Vologda Oblast', 'Voronezh Oblast', 'Yamalo-Nenets Autonomous Okrug', 'Yaroslavl Oblast'] },
    { name: 'Rwanda', flag: '🇷🇼', states: [ 'Kigali City', 'Eastern Province', 'Northern Province', 'Southern Province', 'Western Province'] },
    { name: 'Samoa', flag: '🇼🇸', states: ['Samoa'] },
    { name: 'San Marino', flag: '🇸🇲', states: ['San Marino'] },
    { name: 'São Tomé and Príncipe', flag: '🇸🇹', states: ['São Tomé and Príncipe'] },
    { name: 'Saudi Arabia', flag: '🇸🇦', states: ['Al Bahah', 'Al Hudud ash Shamaliyah', 'Al Jawf', 'Al Madinah', 'Al Qasim', 'Ar Riyad', 'Ash Sharqiyah', 'Asir', 'Ha`il', 'Jazan', 'Makkah', 'Najran', 'Tabuk'] },
    { name: 'Senegal', flag: '🇸🇳', states: ['Dakar', 'Diourbel', 'Fatick', 'Kaffrine', 'Kaolack', 'Kédougou', 'Kolda', 'Louga', 'Matam', 'Saint-Louis', 'Sédhiou', 'Tambacounda', 'Thiès', 'Ziguinchor'] },
    { name: 'Serbia', flag: '🇷🇸', states: ['Vojvodina', 'Belgrade', 'Šumadija and Western Serbia', 'Southern and Eastern Serbia', 'Kosovo and Metohija'] },
    { name: 'Seychelles', flag: '🇸🇨', states: ['Seychelles'] },
    { name: 'Sierra Leone', flag: '🇸🇱', states: [ 'Northern', 'Eastern', 'Southern', 'Western'] },
    { name: 'Singapore', flag: '🇸🇬', states: ['Central', 'East', 'North', 'North-East', 'West'] },
    { name: 'Sint Maarten', flag: '🇸🇽', states: ['Sint Maarten'] },
    { name: 'Slovakia', flag: '🇸🇰', states: ['Bratislava',
        'Trnava',
        'Trenčín',
        'Nitra',
        'Žilina',
        'Banská Bystrica',
        'Prešov',
        'Košice'] },
    { name: 'Slovenia', flag: '🇸🇮', states: ['Pomurska',
        'Podravska',
        'Koroška',
        'Savinjska',
        'Zasavska',
        'Spodnjeposavska',
        'Jugovzhodna Slovenija',
        'Osrednjeslovenska',
        'Gorenjska',
        'Notranjsko-kraška',
        'Goriška',
        'Obalno-kraška'] },
    { name: 'Solomon Islands', flag: '🇸🇧', states: ['Solomon Islands'] },
    { name: 'Somalia', flag: '🇸🇴', states: ['Somalia'] },
    { name: 'South Africa', flag: '🇿🇦', states: ['Eastern Cape', 'Free State', 'Gauteng',' KwaZulu-Natal', 'Limpopo', 'Mpumalanga', 'North West', 'Northern Cape', 'Western Cape'] },
    { name: 'South Georgia & South Sandwich Islands', flag: '🇬🇸', states: ['South Georgia & South Sandwich Islands'] },
    { name: 'South Korea', flag: '🇰🇷', states: ['Chungcheongbuk-do', 'Chungcheongnam-do', 'Gangwon-do', 'Gyeongsangbuk-do', 'Gyeongsangnam-do', 'Jeollabuk-do', 'Jeollanam-do', 'Jeju', 'Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju'] },
    { name: 'South Sudan', flag: '🇸🇸', states: ['Central Equatoria', 'Eastern Equatoria', 'Jonglei', 'Lakes', 'Northern Bahr el Ghazal', 'Unity', 'Upper Nile', 'Warrap', 'Western Bahr el Ghazal', 'Western Equatoria', 'Eastern Lakes', 'Greater Pibor', 'Western Nile', 'Abyei', 'Boma', 'Eastern Bieh', 'Eastern Nile', 'Fangak', 'Gbudwe', 'Gogrial', 'Lol', 'Maiwut', 'Northern Liech', 'Panyijar', 'Ruweng', 'Southern Liech', 'Southern Ruweng', 'Tonj', 'Twic', 'Yei River', 'Terekeka'] },
    { name: 'Spain', flag: '🇪🇸', states: [ 'Andalusia', 'Aragon', 'Asturias', 'Balearic Islands', 'Basque Country', 'Canary Islands', 'Cantabria', 'Castile and Leon', 'Castile-La Mancha', 'Catalonia', 'Extremadura', 'Galicia', 'La Rioja', 'Madrid', 'Murcia', 'Navarre', 'Valencia',  'Ceuta' , 'Melilla'] },
    { name: 'Sri Lanka', flag: '🇱🇰', states: ['Central Province', 'Eastern Province', 'Northern Province', 'North Central Province', 'North Western Province', 'Sabaragamuwa Province', 'Southern Province', 'Uva Province', 'Western Province'] },
    { name: 'St. Barthélemy', flag: '🇧🇱', states: ['St. Barthélemy'] },
    { name: 'St. Helena', flag: '🇸🇭', states: ['St. Helena'] },
    { name: 'St. Kitts & Nevis', flag: '🇰🇳', states: ['St. Kitts & Nevis'] },
    { name: 'St. Lucia', flag: '🇱🇨', states: ['St. Lucia'] },
    { name: 'St. Martin', flag: '🇲🇫', states: ['St. Martin'] },
    { name: 'St. Pierre & Miquelon', flag: '🇵🇲', states: ['St. Pierre & Miquelon'] },
    { name: 'St. Vincent & Grenadines', flag: '🇻🇨', states: ['St. Vincent & Grenadines'] },
    { name: 'Sudan', flag: '🇸🇩', states: ['Al Jazirah',
        'Al Qadarif',
        'Blue Nile',
        'Central Darfur',
        'East Darfur',
        'Gedaref',
        'Kassala',
        'Khartoum',
        'North Darfur',
        'North Kordofan',
        'Northern',
        'Red Sea',
        'River Nile',
        'Sennar',
        'South Darfur',
        'South Kordofan',
        'West Darfur',
        'White Nile'] },
    { name: 'Suriname', flag: '🇸🇷', states: ['Suriname'] },
    { name: 'Svalbard & Jan Mayen', flag: '🇸🇯', states: ['Svalbard & Jan Mayen'] },
    { name: 'Swaziland', flag: '🇸🇿', states: ['Hhohho', 'Manzini', 'Lubombo', 'Shiselweni'] },
    { name: 'Sweden', flag: '🇸🇪', states: ['Blekinge', 'Dalarna', 'Gotland', 'Gävleborg', 'Halland', 'Jämtland', 'Jönköping', 'Kalmar', 'Kronoberg', 'Norrbotten', 'Skåne', 'Stockholm', 'Södermanland', 'Uppsala', 'Värmland', 'Västerbotten', 'Västernorrland', 'Västmanland', 'Västra Götaland', 'Örebro', 'Östergötland'] },
    { name: 'Switzerland', flag: '🇨🇭', states: ['Aargau', 'Appenzell' ,'Ausserrhoden', 'Appenzell Innerrhoden', 'Basel-Landschaft', 'Basel-Stadt', 'Bern', 'Freiburg', 'Genève', 'Glarus', 'Graubünden', 'Jura', 'Luzern', 'Neuchâtel', 'Nidwalden', 'Obwalden', 'St. Gallen', 'Schaffhausen', 'Schwyz', 'Solothurn', 'Thurgau', 'Ticino', 'Uri', 'Unterwalden', 'Zürich', 'Zug'] },
    { name: 'Syria', flag: '🇸🇾', states: ['Al-Hasakah', 'Al-Raqqa', 'Aleppo', 'As-Suwayda', 'Damascus', 'Daraa', 'Deir ez-Zor', 'Hama', 'Homs', 'Idlib', 'Latakia', 'Quneitra', 'Rif Dimashq', 'Tartus'] },
    { name: 'Taiwan', flag: '🇹🇼', states: ['Taiwan Province ', 'Fujian Province'] },
    { name: 'Tajikistan', flag: '🇹🇯', states: ['Sughd', 'Khatlon', 'Gorno-Badakhshan Autonomous Region', 'the Districts of Republican Subordination'] },
    { name: 'Tanzania', flag: '🇹🇿', states: ['Dar es Salaam', 'Zanzibar City', 'Mwanza', 'Arusha', 'Dodoma', 'Mbeya'] },
    { name: 'Thailand', flag: '🇹🇭', states: ['Bangkok', 'Chiang Mai', 'Phuket', 'Krabi', 'Pattaya', 'Hua Hin'] },
    { name: 'Timor-Leste', flag: '🇹🇱', states: ['Dili', 'Baucau', 'Aileu', 'Ainaro', 'Liquiçá', 'Manatuto'] },
    { name: 'Togo', flag: '🇹🇬', states: ['Togo'] },
    { name: 'Tokelau', flag: '🇹🇰', states: ['Tokelau'] },
    { name: 'Tonga', flag: '🇹🇴', states: ['Tonga'] },
    { name: 'Trinidad & Tobago', flag: '🇹🇹', states: ['Trinidad & Tobago'] },
    { name: 'Tunisia', flag: '🇹🇳', states: ['Ariana', 'Béja', 'Ben Arous', 'Bizerte', 'Gabès', 'Gafsa', 'Jendouba', 'Kairouan', 'Kasserine', 'Kebili', 'Kef', 'Mahdia', 'Manouba', 'Medenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'] },
    { name: 'Turkey', flag: '🇹🇷', states: ['Adana', 'Ankara', 'Antalya', 'Bursa', 'Istanbul', 'Izmir', 'Trabzon'] },
    { name: 'Turkmenistan', flag: '🇹🇲', states: ['Ahal', 'Balkan', 'Dashoguz', 'Lebap', 'Mary'] },
    { name: 'Turks & Caicos Islands', flag: '🇹🇨', states: ['Turks & Caicos Islands'] },
    { name: 'Tuvalu', flag: '🇹🇻', states: ['Tuvalu'] },
    { name: 'U.S. Outlying Islands', flag: '🇺🇲', states: ['U.S. Outlying Islands'] },
    { name: 'U.S. Virgin Islands', flag: '🇻🇮', states: ['U.S. Virgin Islands'] },
    { name: 'Uganda', flag: '🇺🇬', states: ['Uganda'] },
    { name: 'Ukraine', flag: '🇺🇦', states: ['Cherkasy',
        'Chernihiv',
        'Chernivtsi' ,
        'Dnipropetrovsk' ,
        'Donetsk' ,
        'Ivano-Frankivsk ',
        'Kharkiv' ,
        'Kherson' ,
        'Khmelnytskyi' ,
        'Kirovohrad' ,
        'Kyiv' ,
        'Luhansk' ,
        'Lviv' ,
        'Mykolaiv' ,
        'Odessa' ,
        'Poltava' ,
        'Rivne' ,
        'Sumy' ,
        'Ternopil' ,
        'Vinnytsia' ,
        'Volyn' ,
        'Zakarpattia' ,
        'Zaporizhzhia' ,
        'Zhytomyr' ] },
    { name: 'United Arab Emirates', flag: '🇦🇪', states: ['Abu Dhabi', 'Ajman', 'Dubai', 'Fujairah', 'Ras al-Khaimah', 'Sharjah', 'Umm al-Quwain'] },
    { name: 'United Kingdom', flag: '🇬🇧', states: ['England', 'Scotland', 'Wales', 'Northern Ireland'] },
    { name: 'United States', flag: '🇺🇸', states: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'] },
    { name: 'Uruguay', flag: '🇺🇾', states: ['Artigas', 'Canelones', 'Cerro Largo', 'Colonia', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Montevideo', 'Paysandu', 'Rio Negro', 'Rivera', 'Rocha', 'Salto', 'San Jose', 'Soriano', 'Tacuarembo', 'Treinta y Tres'] },
    { name: 'Uzbekistan', flag: '🇺🇿', states: ['Andijan', 'Bukhara', 'Fergana', 'Jizzakh', 'Namangan', 'Navoiy', 'Qashqadaryo', 'Karakalpakstan', 'Samarqand', 'Sirdaryo', 'Surxondaryo', 'Tashkent', 'Xorazm'] },
    { name: 'Vanuatu', flag: '🇻🇺', states: ['Vanuatu'] },
    { name: 'Vatican City', flag: '🇻🇦', states: ['Vatican City'] },
    { name: 'Venezuela', flag: '🇻🇪', states: ["Amazonas", "Anzoátegui", "Apure", "Aragua", "Barinas", "Bolívar", "Carabobo", "Cojedes", "Delta Amacuro", "Falcón", "Guárico", "Lara", "Mérida", "Miranda", "Monagas", "Nueva Esparta", "Portuguesa", "Sucre", "Táchira", "Trujillo", "Vargas", "Yaracuy", "Zulia"] },
    { name: 'Vietnam', flag: '🇻🇳', states:["An Giang", "Bạc Liêu", "Bắc Kạn", "Bắc Giang", "Bắc Ninh", "Bến Tre", "Bình Dương", "Bình Định", "Bình Phước", "Bình Thuận", "Cà Mau", "Cao Bằng", "Cần Thơ (municipality)", "Đà Nẵng (municipality)", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội (municipality)", "Hà Tĩnh", "Hải Dương", "Hải Phòng (municipality)", "Hậu Giang", "Hòa Bình", "Hồ Chí Minh (municipality)", "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"] },
    { name: 'Wallis & Futuna', flag: '🇼🇫', states: ['Wallis & Futuna'] },
    { name: 'Western Sahara', flag: '🇪🇭', states: ['Western Sahara'] },
    { name: 'Yemen', flag: '🇾🇪', states: ['Abyan', 'Ad Dali', 'Aden', 'Al Bayda', 'Al Hudaydah', 'Al Jawf', 'Al Mahrah', 'Al Mahwit', 'Amran', 'Dhamar', 'Hadramaut', 'Hajjah', 'Ibb', 'Lahij', 'Ma`rib', 'Raymah', 'Saada', 'Sana\'a', 'Shabwah', 'Socotra', 'Ta`izz'] },
    { name: 'Zambia', flag: '🇿🇲', states: ['Central', 'Copperbelt', 'Eastern', 'Luapula', 'Lusaka', 'Muchinga', 'Northern', 'North-Western', 'Southern', 'Western'] },
    { name: 'Zimbabwe', flag: '🇿🇼', states: ['Bulawayo', 'Harare', 'Manicaland', 'Mashonaland Central', 'Mashonaland East', 'Mashonaland West', 'Masvingo', 'Matabeleland North', 'Matabeleland South', 'Midlands'] },
  ];

const genders = [
    { type : 'Male' , icon : '♂'},
    { type : 'Female' , icon : '♀'},
]  

const questions = [
    {name: 'What is your mother`s maiden name?'},
    {name: 'What was the name of your first pet?'},
    {name: 'What city were you born in?'},
    {name: 'What is your favorite book?'},
    {name: 'What is your favorite movie?'},
    {name: 'What is your favorite food?'},
    {name: 'What is your favorite color?'},
    {name: 'What is the name of your favorite teacher?'},
    {name: 'What is the name of the street you grew up on?'},
    {name: 'What is the name of your favorite childhood teacher?'},
    {name: 'In what city or town did you meet your spouse/significant other?'},
    {name: 'What was the first concert you ever attended?'},
    {name: 'What was the make and model of your first car?'},
    {name: 'What was your first job?'},
    {name: 'What was your high school mascot?'},
    {name: 'What is the name of your favorite childhood friend?'},
    {name: 'What is your unfavorite color?'},
    {name: 'What is the name of the first book you ever read?'},
    {name: 'What is the name of the hospital where you were born?'}
]

const degrees = ['Associate degree', 
'Bachelor`s degree',
'Master degree',
'Doctoral degree', 
'Professional degree',
'Certificate degree'];




function Profile() {


    const [prevalue, setPrevalue] = useState('one')
    const [value, setValue] = useState('one');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [gender, setGender] = useState('');
    const [question, setQuestion] = useState('');
    const [home, setHome] = useState('');
    const [altphone, setAltphone] = useState('');
    const [altemail, setAltemail] = useState('');
    const [profile, setProfile] = useState('');
    const [answer, setAnswer] = useState('');
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [dateofbirth, setDateofbirth] = useState('');
    const [phone, setPhone] = useState('');
    const [degree, setDegree] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [viewImage, setViewImage] = useState('')

    const fileInputRef = useRef(null);


   

    const handleChangetab = (event, newValue) => {
      setPrevalue(newValue);
    };

   
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };





    const [activeTab, setActiveTab] = useState(null);

  
    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };


    const [accountTab, setAccountTab] = useState(null);

  
    const handleAccountClick = (tab) => {
        setAccountTab(tab);
    };


  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('usersdatatoken');
    if (token) {
    const decodedToken = jwtDecode(token);
    setUserId(decodedToken.id);
    }
    }, []);
    
    const [user, setUser] = useState(null);
    const [showBackdrops, setShowBackdrops] = useState(true);
    
    useEffect(() => {
    
    axios.get(`http://localhost:5000/royecruit/getUser/${userId}`)
      .then(response => {
        setUser(response.data);
        const timer = setTimeout(() => {
          setShowBackdrops(false);
        }, 3000);
    
        return () => clearTimeout(timer);
      })
      .catch(error => {
        console.error(error);
      });
    }, [userId]);
    
    if (!user) {
    return <> <Backdrop open={showBackdrops}>
    <CircularProgress color="inherit" />
  </Backdrop> </>;
    }

    function calculateAge (){
        const dateOfBirth = user.dateofbirth;
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const formattedDate = birthDate.toLocaleDateString('en-US');
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return formattedDate + "  (" + age + ")";
        }


        const handleFirstnameChange = (event) => {
            setFirstname(event.target.value);
          };

        const handleLastnameChange = (event) => {
        setLastname(event.target.value);
        };  

        const handleEmail2Change = (event) => {
            setEmail(event.target.value);
        };

        const handleDateofbirthChange = (event) => {
            setDateofbirth(event.target.value);
        };

        const handlePhone2Change = (event) => {
            setPhone(event.target.value);
        };


        const handleDegreeChange = (event) => {
            setDegree(event.target.value);
        };



      
        const handleCountryChange = (event) => {
          setSelectedCountry(event.target.value);
          setSelectedState('');
        };
    
        const handleHomeChange = (event) => {
            setHome(event.target.value);
          };
          
          const handlePhoneChange = (event) => {
            setAltphone(event.target.value);
          };
    
          const handleEmailChange = (event) => {
            setAltemail(event.target.value);
          };
    
          const handleProfileChange = (event) => {
            setProfile(event.target.value);
          };
    
          const handleAnswerChange = (event) => {
            setAnswer(event.target.value);
          };
    
        const handleGenderChange = (event) => {
            setGender(event.target.value);
          };
    
          const handleQuestionChange = (event) => {
            setQuestion(event.target.value);
          };
      
        const handleStateChange = (event) => {
          setSelectedState(event.target.value);
        };
      
        const countryStates = countries.find((c) => c.name === selectedCountry)?.states || [];
        
        

        const handleSubmit = async (event) => {
            event.preventDefault();

       
            try {
              const response = await fetch(`http://localhost:5000/royecruit/updateuserinfo/${userId}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                selectedCountry,
                selectedState,
                home,
                gender,
                altphone,
                altemail,
                profile,
                question,
                answer,
                }),
              });
        
              if (response.ok) {
                const data = await response.json();

                console.log(data);
                setSelectedCountry('')
                setSelectedState('')
                setHome('')
                setGender('')
                setAltphone('')
                setAltemail('')
                setProfile('')
                setQuestion('')
                setAnswer('')
                setIsSuccess(true);
                setIsSnackbarOpen(true);
              } else {

                console.error('Failed to save user details:', response.statusText);
                setIsSuccess(false);
                setIsSnackbarOpen(true);
              }
            } catch (err) {
              console.error('Server error:', err.message);
            }
          };

          const handleCloseSnackbar = () => {
            setIsSnackbarOpen(false);
          };

          const handleDone = async (event) => {
            event.preventDefault();

            try {
              const response = await fetch(`http://localhost:5000/royecruit/updateuser/${userId}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  firstname,
                  lastname,
                  email,
                  dateofbirth,
                  phone,
                  degree
                }),
              });
        
              if (response.ok) {
                const data = await response.json();

                console.log(data);
                setFirstname('')
                setLastname('')
                setEmail('')
                setDateofbirth('')
                setPhone('')
                setDegree('')
                setIsSuccess(true);
                setIsSnackbarOpen(true);
              } else {

                console.error('Failed to save user details:', response.statusText);
                setIsSuccess(false);
                setIsSnackbarOpen(true);
              }
            } catch (err) {
              console.error('Server error:', err.message);
            }
          };

          const handlePassword = async (event) => {
            event.preventDefault();

            
            if (newPassword !== confirmPassword) {
              alert('Passwords do not match');
            }

            const formData = new FormData()
  
            formData.append('oldPassword', oldPassword);
            formData.append('newPassword', newPassword);

            try {
              const response = await fetch(`http://localhost:5000/royecruit/updatepassword/${userId}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  oldPassword,
                  newPassword
                  }),
              });
        
              if (response.ok) {
                const data = await response.json();

                console.log(data);
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setIsSuccess(true);
                setIsSnackbarOpen(true);
              } else {

                console.error('Failed to save user details:', response.statusText);
                setIsSuccess(false);
                setIsSnackbarOpen(true);
              }
            } catch (err) {
              console.error('Server error:', err.message);
            }
          };



          const handleImageChange = (event) => {
          fileInputRef.current.click();
          setSelectedImage(event.target.files[0]);
          const file = event.target.files[0];
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            setViewImage(reader.result);
          };
          };

          const handleImageUpdate = async () => {
            
            try {
              const formData = new FormData();
              formData.append('image', selectedImage);
        
              await axios.put(`http://localhost:5000/royecruit/users/${userId}/image`, formData);
        
              setIsSuccess(true);
              setIsSnackbarOpen(true);
              setSelectedImage('');
              setViewImage('')
            } catch (error) {
              console.error(error);
              setSelectedImage('');
              setViewImage('')
              setIsSuccess(false);
              setIsSnackbarOpen(true);
            }
          };


  return (

    <React.Fragment>
        <>
  <Tabs
        value={prevalue}
        onChange={handleChangetab}
        aria-label="secondary tabs example"
        sx={{marginLeft: "35%", mt:13}}
      >
        <Tab value="one" label="Account Settings" onClick={() => handleTabClick('account')} />
        <Tab value="two" label="Password Change" onClick={() => handleTabClick('password')} />
        
      </Tabs>
  {activeTab === null && (
        <>
        <Grid container spacing={2}>
            <Grid item xs={6}>
            <Avatar alt="Admin Avatar" src={user.image} variant="rounded" sx={{ width: 150, height: 150 , borderRadius: "50%", marginLeft: 40, marginTop: 8}} /> 
            </Grid>
            <Grid item xs={6}>
            <Typography sx={{fontFamily:"Oswald", fontSize:26, fontWeight:"bold", mt: 10,}}>
                Your Personal
      <Typewriter
        words={[' Informations']}
        loop={false}
        cursor
        cursorStyle='|'
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={1000}
        onLoopDone={() => false}
      />
    </Typography>
                </Grid>
        </Grid>

        <div>
            <Grid container spacing={0}>
                <Grid item xs={6}>
                </Grid>
                <Grid item xs={6} container direction="column">
                <Grid item container spacing={1}>
                <Grid item xs={6}>
                <Typography sx={{fontFamily:"Oswald", fontSize:20, fontWeight:"bold", mt: 1, }}>Firstname<span style={{color:"red"}}>*</span></Typography>
                <Typography sx={{fontFamily:"Oswald", fontSize:22, fontWeight:300,}}>{user.firstname}</Typography>
                <Typography sx={{fontFamily:"Oswald", fontSize:20, fontWeight:"bold", mt: 3, }}>Email<span style={{color:"red"}}>*</span></Typography>
                <Typography sx={{fontFamily:"Oswald", fontSize:22, fontWeight:300,}}>{user.email}</Typography>
                <Typography sx={{fontFamily:"Oswald", fontSize:20, fontWeight:"bold", mt: 3, }}>Date Of Birth<span style={{color:"red"}}>*</span></Typography>
                <Typography sx={{fontFamily:"Oswald", fontSize:22, fontWeight:300,}}>{calculateAge()}</Typography>
                <Typography sx={{fontFamily:"Oswald", fontSize:20, fontWeight:"bold", mt: 3, }}>Degree<span style={{color:"red"}}>*</span></Typography>
                <Typography sx={{fontFamily:"Oswald", fontSize:22, fontWeight:300,}}>{user.degree}</Typography>
                </Grid>
                <Grid item xs={6}>
                <Typography sx={{fontFamily:"Oswald", fontSize:20, fontWeight:"bold", mt: 1}}>Lastname<span style={{color:"red"}}>*</span></Typography>
                <Typography sx={{fontFamily:"Oswald", fontSize:22, fontWeight:300, }}>{user.lastname}</Typography>
                <Typography > {""} </Typography>
                <Typography > {""} </Typography>
                <Typography sx={{fontFamily:"Oswald", fontSize:20, fontWeight:"bold", mt: 14, }}>Phone Number<span style={{color:"red"}}>*</span></Typography>
                <Typography sx={{fontFamily:"Oswald", fontSize:22, fontWeight:300,}}>{user.phone}</Typography>
                <Link  sx={{fontFamily:"Oswald", textDecoration:"none" , fontSize:20, fontWeight:"bold", mt: 18, float:"right", marginRight: 4 }}>Enhance Your Account <br/> With More Informations</Link>
                </Grid>
                </Grid>
                </Grid>
            </Grid>
            

        </div>


        </>
  )}

  {activeTab === 'account' && (
    <>
    <Tabs
        value={value}
        onChange={handleChange}
        aria-label="secondary tabs example"
        sx={{marginLeft: "27%", mt:2}}
      >
        <Tab value="one" label="Personal Details" onClick={() => handleAccountClick('accountinfo')} />
        <Tab value="two" label="Account Management" onClick={() => handleAccountClick('accountupdate')} />
        <Tab value="three" label="Personalize Account" onClick={() => handleAccountClick('accountdetail')} />

        
      </Tabs>
      {accountTab === null && (
        <>
        <Grid container spacing={2}>
            <Grid item xs={6}>
            {!selectedImage ? (
              <div style={{position:"absolute",}}>
            <Avatar alt="Admin Avatar" src={user.image} variant="rounded" sx={{position:"relative", width: 150, height: 150 , borderRadius: "50%", marginLeft: 40, marginTop: 4}} /> 
            
            <label htmlFor="image-upload" style={{ cursor: 'pointer' }}>
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              border: 'none',
              marginLeft:"370px",
              overflow: 'hidden',
              position: 'absolute',
              bottom:'55px',

            }}
          >
            <input
              type="file"
              id="image-upload"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer'
              }}
            />
            <span>
              <AddPhotoAlternateIcon sx={{mt:2, ml:2, color:"white"}}/>
            </span>
          </div>
        </label>

            </div>
            ) : (
              <>
                    {viewImage && (
          <Avatar src={viewImage} variant="rounded" sx={{position:"relative", width: 150, height: 150 , borderRadius: "50%", marginLeft: 40, marginTop: 4}} />
          )}
          <div style={{marginLeft:"380px"}}>

          
                 <IconButton onClick={handleImageUpdate} type='submit' >
                 <CheckIcon sx={{color:"green"}}/> 
                 </IconButton>
   </div>
   <Snackbar
     open={isSnackbarOpen}
     autoHideDuration={5000}
     onClose={handleCloseSnackbar}
   >
     <Alert
       onClose={handleCloseSnackbar}
       severity={isSuccess ? 'success' : 'error'}
     >
       {isSuccess ? 'Picture have been successfully Updated!' : 'An error have been detected..?'}
     </Alert>
   </Snackbar>  
              </>
            )}
            </Grid>
            <Grid item xs={6}>
            <Typography sx={{fontFamily:"Oswald", fontSize:26, fontWeight:"bold", mt: 8,}}>
                Your Personal
      <Typewriter
        words={[' Informations']}
        loop={false}
        cursor
        cursorStyle='|'
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={1000}
        onLoopDone={() => false}
      />
    </Typography>
                </Grid>
        </Grid>

        <div>
            <Grid container spacing={0}>
                <Grid item xs={6}>
                </Grid>
                <Grid item xs={6} container direction="column">
                <Grid item container spacing={1}>
                <Grid item xs={6}>
                <Typography sx={{fontFamily:"Oswald", fontSize:20, fontWeight:"bold", mt: 1, }}>Firstname<span style={{color:"red"}}>*</span></Typography>
                <Typography sx={{fontFamily:"Oswald", fontSize:22, fontWeight:300,}}>{user.firstname}</Typography>
                <Typography sx={{fontFamily:"Oswald", fontSize:20, fontWeight:"bold", mt: 3, }}>Email<span style={{color:"red"}}>*</span></Typography>
                <Typography sx={{fontFamily:"Oswald", fontSize:22, fontWeight:300,}}>{user.email}</Typography>
                <Typography sx={{fontFamily:"Oswald", fontSize:20, fontWeight:"bold", mt: 3, }}>Date Of Birth<span style={{color:"red"}}>*</span></Typography>
                <Typography sx={{fontFamily:"Oswald", fontSize:22, fontWeight:300,}}>{calculateAge()}</Typography>
                <Typography sx={{fontFamily:"Oswald", fontSize:20, fontWeight:"bold", mt: 3, }}>Degree<span style={{color:"red"}}>*</span></Typography>
                <Typography sx={{fontFamily:"Oswald", fontSize:22, fontWeight:300,}}>{user.degree}</Typography>
                </Grid>
                <Grid item xs={6}>
                <Typography sx={{fontFamily:"Oswald", fontSize:20, fontWeight:"bold", mt: 1}}>Lastname<span style={{color:"red"}}>*</span></Typography>
                <Typography sx={{fontFamily:"Oswald", fontSize:22, fontWeight:300, }}>{user.lastname}</Typography>
                <Typography > {""} </Typography>
                <Typography > {""} </Typography>
                <Typography sx={{fontFamily:"Oswald", fontSize:20, fontWeight:"bold", mt: 14, }}>Phone Number<span style={{color:"red"}}>*</span></Typography>
                <Typography sx={{fontFamily:"Oswald", fontSize:22, fontWeight:300,}}>{user.phone}</Typography>
                <Link  sx={{fontFamily:"Oswald", textDecoration:"none" , fontSize:20, fontWeight:"bold", mt: 12, float:"right", marginRight: 4 }}>Enhance Your Account <br/> With More Informations</Link>
                </Grid>
                </Grid>
                </Grid>
            </Grid>
            

        </div>


        </>
      )}

        {accountTab === 'accountinfo' && (
        <>
        <Grid container spacing={2}>
        <Grid item xs={6}>
            {!selectedImage ? (
              <div style={{position:"absolute",}}>
            <Avatar alt="Admin Avatar" src={user.image} variant="rounded" sx={{position:"relative", width: 150, height: 150 , borderRadius: "50%", marginLeft: 40, marginTop: 4}} /> 
            
            <label htmlFor="image-upload" style={{ cursor: 'pointer' }}>
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              border: 'none',
              marginLeft:"370px",
              overflow: 'hidden',
              position: 'absolute',
              bottom:'55px',

            }}
          >
            <input
              type="file"
              id="image-upload"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer'
              }}
            />
            <span>
              <AddPhotoAlternateIcon sx={{mt:2, ml:2, color:"white"}}/>
            </span>
          </div>
        </label>

            </div>
            ) : (
              <>
                    {viewImage && (
          <Avatar src={viewImage} variant="rounded" sx={{position:"relative", width: 150, height: 150 , borderRadius: "50%", marginLeft: 40, marginTop: 4}} />
          )}
          <div style={{marginLeft:"380px"}}>

          
                 <IconButton onClick={handleImageUpdate} type='submit' >
                 <CheckIcon sx={{color:"green"}}/> 
                 </IconButton>
   </div>
   <Snackbar
     open={isSnackbarOpen}
     autoHideDuration={5000}
     onClose={handleCloseSnackbar}
   >
     <Alert
       onClose={handleCloseSnackbar}
       severity={isSuccess ? 'success' : 'error'}
     >
       {isSuccess ? 'Picture have been successfully Updated!' : 'An error have been detected..?'}
     </Alert>
   </Snackbar>  
              </>
            )}
            </Grid>
            <Grid item xs={6}>
            <Typography sx={{fontFamily:"Oswald", fontSize:26, fontWeight:"bold", mt: 8,}}>
                
    </Typography>
                </Grid>
        </Grid>

        <div>
            <Grid container spacing={0}>
                <Grid item xs={6}>
                </Grid>
                <Grid item xs={6} container direction="column">
                <Grid item container spacing={1}>
                <Grid item xs={6}>
                <Typography sx={{fontFamily:"Oswald", fontSize:20, fontWeight:"bold", mt: 1, }}>Firstname<span style={{color:"red"}}>*</span></Typography>
                <Typography sx={{fontFamily:"Oswald", fontSize:22, fontWeight:300,}}>{user.firstname}</Typography>
                <Typography sx={{fontFamily:"Oswald", fontSize:20, fontWeight:"bold", mt: 3, }}>Email<span style={{color:"red"}}>*</span></Typography>
                <Typography sx={{fontFamily:"Oswald", fontSize:22, fontWeight:300,}}>{user.email}</Typography>
                <Typography sx={{fontFamily:"Oswald", fontSize:20, fontWeight:"bold", mt: 3, }}>Date Of Birth<span style={{color:"red"}}>*</span></Typography>
                <Typography sx={{fontFamily:"Oswald", fontSize:22, fontWeight:300,}}>{calculateAge()}</Typography>
                <Typography sx={{fontFamily:"Oswald", fontSize:20, fontWeight:"bold", mt: 3, }}>Degree<span style={{color:"red"}}>*</span></Typography>
                <Typography sx={{fontFamily:"Oswald", fontSize:22, fontWeight:300,}}>{user.degree}</Typography>
                </Grid>
                <Grid item xs={6}>
                <Typography sx={{fontFamily:"Oswald", fontSize:20, fontWeight:"bold", mt: 1}}>Lastname<span style={{color:"red"}}>*</span></Typography>
                <Typography sx={{fontFamily:"Oswald", fontSize:22, fontWeight:300, }}>{user.lastname}</Typography>
                <Typography > {""} </Typography>
                <Typography > {""} </Typography>
                <Typography sx={{fontFamily:"Oswald", fontSize:20, fontWeight:"bold", mt: 14, }}>Phone Number<span style={{color:"red"}}>*</span></Typography>
                <Typography sx={{fontFamily:"Oswald", fontSize:22, fontWeight:300,}}>{user.phone}</Typography>
                <Link  sx={{fontFamily:"Oswald", textDecoration:"none" , fontSize:20, fontWeight:"bold", mt: 12, float:"right", marginRight: 4 }}>Enhance Your Account <br/> With More Informations</Link>
                </Grid>
                </Grid>
                </Grid>
            </Grid>
            

        </div>


        </>
        )}
        {accountTab === 'accountupdate' && (
            <>
            <Typography sx={{fontFamily:"Oswald", fontSize:26, fontWeight:"bold", mt: 4, textAlign:"center"}}>
            Update Your 
      <Typewriter
        words={[' Information']}
        loop={false}
        cursor
        cursorStyle='|'
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={1000}
        onLoopDone={() => false}
      />
    </Typography>

    <form onSubmit={handleDone}>

      <Typography sx={{fontFamily:"Oswald", fontSize:20, fontWeight:"bold", mt: 3, marginLeft: 32}}>Fullname <span style={{color:"red"}}>*</span></Typography>
      <TextField type="text" label="Firstname" name="firstname" value={firstname} onChange={handleFirstnameChange} sx={{marginTop: 1 , width: '29.5%', marginLeft: 32}}   />
      <TextField type="text" label="Lastname" name="lastname" value={lastname} onChange={handleLastnameChange} sx={{marginTop: 1 , width: '30%', marginLeft: 7}}   />
      
      <Typography sx={{fontFamily:"Oswald", fontSize:20, fontWeight:"bold", mt: 3, marginLeft: 32}}>Email <span style={{color:"red"}}>*</span></Typography>
      <TextField type="text" label="Email" name="email" value={email} onChange={handleEmail2Change} sx={{marginTop: 1 , width: '64%', marginLeft: 32}}   />

      <Typography sx={{fontFamily:"Oswald", fontSize:20, fontWeight:"bold", mt: 3, marginLeft: 32}}>Date Of Birth <span style={{color:"red"}}>*</span></Typography>
      <TextField type="date"  name="dateofbirth" value={dateofbirth} onChange={handleDateofbirthChange} sx={{marginTop: 1 , width: '64%', marginLeft: 32}}   />

      <Typography sx={{fontFamily:"Oswald", fontSize:20, fontWeight:"bold", mt: 3, marginLeft: 32}}>Phone Number <span style={{color:"red"}}>*</span></Typography>
      <TextField type="tel" label="Phone Number" name="phone" value={phone} onChange={handlePhone2Change} sx={{marginTop: 1 , width: '64%', marginLeft: 32}}   />

    
      <Typography sx={{fontFamily:"Oswald", fontSize:20, fontWeight:"bold", mt: 3, marginLeft: 32}}>Degree <span style={{color:"red"}}>*</span></Typography>
      <FormControl sx={{marginTop: 1 , width: '64%', marginLeft: 32}}>
      <InputLabel id="degree-label">Degree</InputLabel>
      <Select
        labelId="degree-label"
        id="degree"
        value={degree}
        label="Degree"
        onChange={handleDegreeChange}
      >
        {degrees.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

      <Button onClick={handleDone} variant='outlined' type='submit' sx={{color:"black", backgroundColor:"transparent", border:"1px solid black" , "&:hover": {color:"white", backgroundColor:"black", border:"1px solid black"}, float:"right", mt:4, mr:25, mb: 4 }}>Personalize Account</Button>


      </form>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={isSuccess ? 'success' : 'error'}
        >
          {isSuccess ? 'Profile have been successfully Customized!' : 'An error have been detected..?'}
        </Alert>
      </Snackbar>

            </>
        )}
        {accountTab === 'accountdetail' && (
            <>
            <Typography sx={{fontFamily:"Oswald", fontSize:26, fontWeight:"bold", mt: 4, textAlign:"center"}}>
            Personalize Your 
      <Typewriter
        words={[' Account']}
        loop={false}
        cursor
        cursorStyle='|'
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={1000}
        onLoopDone={() => false}
      />
    </Typography>





            <form onSubmit={handleSubmit}>
            <Typography sx={{fontFamily:"Oswald", fontSize:20, fontWeight:"bold", mt: 4, marginLeft: 32}}>Country & State <span style={{color:"red"}}>*</span></Typography>
        <FormControl sx={{marginTop: 1, width: '30%', marginLeft: 32}}>
        <InputLabel id="country-select-label">Country</InputLabel>
        <Select
          labelId="country-select-label"
          id="country-select"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          {countries.map((country) => (
            <MenuItem key={country.name} value={country.name}>
              <span style={{marginRight: '0.5rem'}}>{country.flag}</span>{country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedCountry && (
        <>
        <FormControl sx={{marginTop: 1, width: '29.5%', marginLeft: 7}}>
          <InputLabel id="state-select-label">State</InputLabel>
          <Select
            labelId="state-select-label"
            id="state-select"
            value={selectedState}
            onChange={handleStateChange}
          >
            {countryStates.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        </>
      ) }
        <Typography sx={{fontFamily:"Oswald", fontSize:20, fontWeight:"bold", mt: 3, marginLeft: 32}}>Home Address <span style={{color:"red"}}>*</span></Typography>
        <TextField type="text" label="Home Address" name="home" value={home} onChange={handleHomeChange} sx={{marginTop: 1 , width: '64%', marginLeft: 32}}   />
         
        <Typography sx={{fontFamily:"Oswald", fontSize:20, fontWeight:"bold", mt: 3, marginLeft: 32}}>Gender <span style={{color:"red"}}>*</span></Typography>
        <FormControl sx={{marginTop: 1, width: '64%', marginLeft: 32}}>
        <InputLabel id="gender-select-label">Gender</InputLabel>
        <Select
          labelId="gender-select-label"
          id="gender-select"
          value={gender}
          onChange={handleGenderChange}
        >
          {genders.map((gender) => (
            <MenuItem key={gender.type} value={gender.type}>
              <span style={{marginRight: '0.5rem'}}>{gender.icon}</span>{gender.type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>


      <Typography sx={{fontFamily:"Oswald", fontSize:20, fontWeight:"bold", mt: 3, marginLeft: 32}}>Alternative Phone Number & Email <span style={{color:"red"}}>*</span></Typography>
      <TextField type="text" label="Alternative Phone Number" name="phone" value={altphone} onChange={handlePhoneChange} sx={{marginTop: 1 , width: '29.5%', marginLeft: 32}}   />
      <TextField type="text" label="Alternative Email" name="email" value={altemail} onChange={handleEmailChange} sx={{marginTop: 1 , width: '30%', marginLeft: 7}}   />
      
      <Typography sx={{fontFamily:"Oswald", fontSize:20, fontWeight:"bold", mt: 3, marginLeft: 32}}>Social Media Profile <span style={{color:"red"}}>*</span></Typography>
      <TextField type="text" label="Social Media Profile" name="social" value={profile} onChange={handleProfileChange} sx={{marginTop: 1 , width: '64%', marginLeft: 32}}   />

      <Typography sx={{fontFamily:"Oswald", fontSize:20, fontWeight:"bold", mt: 3, marginLeft: 32}}>Security Question & Answer <span style={{color:"red"}}>*</span></Typography>
      <FormControl sx={{marginTop: 1, width: '30%', marginLeft: 32}}>
        <InputLabel id="question-select-label">Security Question</InputLabel>
        <Select
          labelId="question-select-label"
          id="question-select"
          value={question}
          onChange={handleQuestionChange}
        >
          {questions.map((question) => (
            <MenuItem key={question.name} value={question.name}>
              {question.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField type="text" label="Your Answer " value={answer} onChange={handleAnswerChange} name="answer" sx={{marginTop: 1 , width: '29.5%', marginLeft: 7}}   />
      <Button onClick={handleSubmit} variant='outlined' type='submit' sx={{color:"black", backgroundColor:"transparent", border:"1px solid black" , "&:hover": {color:"white", backgroundColor:"black", border:"1px solid black"}, float:"right", mt:4, mr:25, mb: 4 }}>Personalize Account</Button>


      </form>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={isSuccess ? 'success' : 'error'}
        >
          {isSuccess ? 'Profile have been successfully Customized!' : 'An error have been detected..?'}
        </Alert>
      </Snackbar>
        </>
        )}
    </>
  )}

  {activeTab === 'password' && (
               <>
               <Typography sx={{fontFamily:"Oswald", fontSize:26, fontWeight:"bold", mt: 4, textAlign:"center"}}>
               Update Your 
         <Typewriter
           words={[' Password']}
           loop={false}
           cursor
           cursorStyle='|'
           typeSpeed={70}
           deleteSpeed={50}
           delaySpeed={1000}
           onLoopDone={() => false}
         />
       </Typography>

       <form onSubmit={handlePassword} >
   
         <Typography sx={{fontFamily:"Oswald", fontSize:20, fontWeight:"bold", mt: 3, marginLeft: 32}}>Current Password <span style={{color:"red"}}>*</span></Typography>
         
         <TextField type="password" label="Current Password" name="oldPassword" value={oldPassword} onChange={handleOldPasswordChange} sx={{marginTop: 1 , width: '62%', marginLeft: 32}}   />

         
         <Typography sx={{fontFamily:"Oswald", fontSize:20, fontWeight:"bold", mt: 3, marginLeft: 32}}>New & Confirm Password <span style={{color:"red"}}>*</span></Typography>
         <TextField type="password" label="New Password" name="newPassword" value={newPassword} onChange={handleNewPasswordChange} sx={{marginTop: 1 , width: '30%', marginLeft: 32}}   />
         <TextField type="password" label="Confirm Password"  name="cPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} sx={{marginTop: 1 , width: '29.5%', marginLeft: 4}}   />
   
         <Button onClick={handlePassword} variant='outlined' type='submit' sx={{color:"black", backgroundColor:"transparent", border:"1px solid black" , "&:hover": {color:"white", backgroundColor:"black", border:"1px solid black"}, float:"right", mt:4, mr:29, mb: 2 }}>Personalize Account</Button>
   
   
         </form>
         <Snackbar
           open={isSnackbarOpen}
           autoHideDuration={5000}
           onClose={handleCloseSnackbar}
         >
           <Alert
             onClose={handleCloseSnackbar}
             severity={isSuccess ? 'success' : 'error'}
           >
             {isSuccess ? 'Password have been successfully Updated!' : 'An error have been detected..?'}
           </Alert>
         </Snackbar>
   
               </>
  )}

</>
    </React.Fragment>
  )
}

export default Profile