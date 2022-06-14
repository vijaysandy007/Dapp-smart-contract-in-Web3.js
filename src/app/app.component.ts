import { Component, OnInit } from '@angular/core';

import Web3 from 'web3'

declare var window: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'web3';
  getAccount: any
  metamask;
  isGetAccount: boolean = false;
  signature: any;
  balance: any;
  transcationHash:any;
  receipt:any

  ngOnInit() {
    this.detectedChainChanged()
  }

  async connectMetamask() {
    const findProvider = window.ethereum.providers ? window.ethereum.providers.then((provider: any) => provider.isMetaMask) : window.ethereum._metamask ? window.ethereum : 0;
    this.metamask = findProvider
    const web3 = new Web3(this.metamask)

    const getAccount = await  this.metamask.request({ method: 'eth_requestAccounts' }).then((account: any) => {
      this.getAccount = account
      this.isGetAccount = true

    })

    // const getAccount = await web3.send()

    this.getSignature()
    this.checkBalance()

  }

  async detectedChainChanged() {
    
    return new Promise(async (resolve, reject) => {

      await window.ethereum.on('accountsChanged', (accounts: any) => {
        resolve(this.getAccount = accounts)

        this.getSignature().then((data: any) => {
          this.signature = data;

        })

      })
    })
  }

  async getSignature() {
    return new Promise(async (resolve, reject) => {

      const web3 = new Web3(this.metamask)

      await web3.eth.personal.sign('Are you want to connect this website', this.getAccount[0], this.getAccount[0]).then((result: any) => {

        this.signature = result

        resolve(this.signature)

      })
    })
  }

  async checkBalance(){
    const web3 = new Web3(this.metamask)
    const balance = await web3.eth.getBalance(this.getAccount[0]).then((balance) => {
      const fromwei = web3.utils.fromWei(balance)
      const numberOf = +(balance)
      this.balance = numberOf.toFixed(4)

    })
  }

  async sendTranscation(){
    const web3 = new Web3(this.metamask)
    
    await web3.eth.sendTransaction({
      from: this.getAccount[0],
      to: '0xE8142BDB8D9fC88450b2485f952bED32A5FB5265',
      value:'1000000000000000'
    }).on('transactionHash', (hash)=>{
      this.transcationHash = hash
    }).on('receipt', (receipt)=>{
     console.log(receipt);
     
    }).on('confirmation', (confirmation)=>{
      console.log(confirmation);
      
    }).on('error', (error)=>{
      console.log(error);
      
    })

  }

}
