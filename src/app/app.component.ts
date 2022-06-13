import { Component, OnInit } from '@angular/core';

import Web3 from 'web3'

declare var window:any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'web3';
  getAccount:any  
  metamask;
  isGetAccount:boolean = false;
  signature:any

  ngOnInit(){
    this.detectedChainChanged()
  }

 async connectMetamask(){
  const metaconnect = window.ethereum.providers ? window.ethereum.providers.find((provider: any) => provider.isMetaMask): window.ethereum._metamask ? window.ethereum : 0 ;
  this.metamask = metaconnect
   const web3 =  new Web3(this.metamask)

   const getAccount = await this.metamask.request({ method: 'eth_requestAccounts' }).then((account:any)=>{
    this.getAccount = account
    this.isGetAccount = true
    
   })
 
   this.getSignature()
  
  }

  async detectedChainChanged(){

   return new Promise(async(resolve, reject)=>{

    await window.ethereum.on('accountsChanged', (accounts:any)=>{
    resolve(this.getAccount = '')

    this.getAccount = accounts

     this.getSignature().then((data:any)=>{
    this.signature =data;
    
   })

    })
   })
  }

  async getSignature(){
    return new Promise(async(resolve, reject)=>{

      const web3 = new Web3(this.metamask)
  
      await web3.eth.personal.sign('Are you want to connect this website', this.getAccount[0], this.getAccount[0]).then((result:any)=>{
  
       this.signature = result
  
       resolve(this.signature)

       console.log(this.signature);
       
      })
     })
  }
 
}
