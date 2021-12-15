import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public selectedProviders = []
  public unselectedProviders = [
    {
      id: '1',
      name: 'John',
      address: '123 Greenway Blvd',
      phone: '8991234321'
    },
    {
      id: '2',
      name: 'Mary',
      address: '443 Windwhisper Road',
      phone: '2233211903'
    },
    {
      id: '3',
      name: 'Jason',
      address: '9992 Pumpkin Hollow',
      phone: '4343219384'
    }
  ];

  constructor() {}

  ngOnInit() {
    if(localStorage.getItem("selectedProviders") === null){
      localStorage.setItem("selectedProviders", JSON.stringify(this.selectedProviders))
    }else{
      this.selectedProviders = JSON.parse(localStorage.selectedProviders)
    }
    if(localStorage.getItem("unselectedProviders") === null){
      localStorage.setItem("unselectedProviders", JSON.stringify(this.unselectedProviders))
    }else{
      this.unselectedProviders = JSON.parse(localStorage.unselectedProviders)
    }
    
  }

  selectProvider(selectedProvider: any){
    this.selectedProviders.push(selectedProvider)
    let removeIndex = this.unselectedProviders.indexOf(selectedProvider)
    this.unselectedProviders.splice(removeIndex, 1)
    this.saveProviderLists()
    
  }

  removeProvider(selectedProvider: any){
    this.unselectedProviders.push(selectedProvider)
    let removeIndex = this.selectedProviders.indexOf(selectedProvider)
    this.selectedProviders.splice(removeIndex, 1)
    this.saveProviderLists()
    
  }

  saveProviderLists(){
    localStorage.setItem("selectedProviders", JSON.stringify(this.selectedProviders))
    localStorage.setItem("unselectedProviders", JSON.stringify(this.unselectedProviders))
  }

}
