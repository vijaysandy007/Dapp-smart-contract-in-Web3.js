import { Component } from '@angular/core';

import Web3 from 'web3'

declare var window:any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web3';
  getAccount:any  
  metamask;
  isGetAccount:boolean = false;
  signature:any

 async connectMetamask(){

  const metaconnect = window.ethereum.providers ? window.ethereum.providers.find((provider: any) => provider.isMetaMask): window.ethereum._metamask ? window.ethereum : 0 ;
  this.metamask = metaconnect
   const web3 =  new Web3(this.metamask)

   const getAccount = await this.metamask.request({ method: 'eth_requestAccounts' }).then((account:any)=>{
    this.getAccount = account
    this.isGetAccount = true
    console.log(account);
    
   })
    
   return new Promise(async(resolve, reject)=>{

    const web3 = new Web3(this.metamask)

    await web3.eth.personal.sign('Are you want to connect this website', this.getAccount[0], this.getAccount[0]).then((result:any)=>{

     this.signature = result

     console.log(result)

     resolve(this.signature)
    })
   })
  
  }
 
}
