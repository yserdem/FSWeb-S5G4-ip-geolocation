//axios import buraya gelecek
import axios from 'axios';
var benimIP;


// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl(){
	await axios({
		method: 'get',
		url: 'https://apis.ergineer.com/ipadresim',
	})
	.then(function (response) {
		return response.data
	})
	.then(function (a) {
		benimIP=a
	});
}				
// ------------ değiştirmeyin --------------


/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
    (tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
    https://apis.ergineer.com/ipgeoapi/<ipniz>
	
	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim 
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/

/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	
*/
/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
    DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
    </div>
*/

/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/



//kodlar buraya gelecek

const data = axios.get('https://apis.ergineer.com/ipgeoapi/178.233.26.115')
.then(response => {
	console.log(response.data);
	cardConstructor(response.data)
})

const cardConstructor = (data) => {
	const card = document.createElement("div");
	card.classList.add("card");

	const flag = document.createElement("img");
	flag.setAttribute("src", data?.ülkebayrağı);
	card.append(flag);

	const card_info = document.createElement("div");
	card_info.classList.add("card-info");
	card.append(card_info);

	const IP = document.createElement("h3");
	IP.classList.add("ip");
	IP.textContent = `IP: ${data?.sorgu}`;
	card_info.append(IP);

	const country = document.createElement("p");
	country.classList.add("ulke");
	country.textContent = `ülke bilgisi: ${data?.ülke}`;
	card_info.append(country);

	const enlem = document.createElement("p");
	enlem.textContent = `Enlem: ${data?.enlem} Boylam: ${data?.boylam}`;
	card_info.append(enlem);

	const city = document.createElement("p");
	city.textContent = `Şehir: ${data?.şehir}`;
	card_info.append(city);

	const time_zone = document.createElement("p");
	time_zone.textContent = `Saat dilimi: ${data?.saatdilimi}`;
	card_info.append(time_zone);

	const currency = document.createElement("p");
	currency.textContent = `Para Birimi: ${data?.parabirimi}`;
	card_info.append(currency);

	const ISP = document.createElement("p");
	ISP.textContent = `ISP: ${data?.isp}`;
	card_info.append(ISP);

	cardContainer.append(card);
}

const cardContainer = document.querySelector(".cards")

async function setCardData() {
	await ipAdresimiAl();

	axios
	.get('https://apis.ergineer.com/ipgeoapi/'+ benimIP)
	.then(function(response) {
		cardContainer.append(cardConstructor(response.data));
	})
	.catch(function(error) {
		console.error("error");
	});
	
}

setCardData()