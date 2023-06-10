import { Component } from '@angular/core';
import { LocationService } from '../location.service';
import { AlertController } from '@ionic/angular';
@Component({ 
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  form:any ={}
  constructor(
    private LocationService:LocationService,
    private alert:AlertController
  ) {}


  async getLocation() {
    const positition = await this.LocationService.getLocation();
    const { latitude, longitude, accuracy } = positition.coords;

    // get address
    const getAddress = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
    const address = await getAddress.json();

    return address;
  }

ionHandler(ev:any){
  this.form.agama = ev
}


  async sendToWhatssapp(){
    
    if(this.validateForm()){
      this.alert.create({
        message:"isi form dengan benar",
        buttons:['ok']
      }).then(a=>{
        a.present()
      })
      return
    }
    
    this.getLocation()
    console.log(this.getLocation());
    const pesan = `NIM: ${this.form.nim}Nama: ${this.form.nama}Alamat: ${this.form.alamat}`
    
    window.open (`https://api.whatsapp.com/send?phone=628551763486&text=${encodeURIComponent(pesan)}`,'_blank')
  }
  sendToTelegram(){}
  sendToEmail(){
    const recipient = "rifkytaufik.h85@gmail.com"
    const subject = "Test Email"
    const body = `NIM: ${this.form.nim}Nama: ${this.form.nama}Alamat: ${this.form.alamat}`
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.open(mailtoLink,`NIM: ${this.form.nim}Nama: ${this.form.nama}Alamat: ${this.form.alamat}`, "_blank")
  }

  validateForm(){
    if (!this.form.nim|| !this.form.nama||!this.form.alamat ) {
      return false 
    }
    return true
  }
}
