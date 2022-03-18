import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SharedDataModule { 
  public languageOptions=[  
    {  
      "id": 1,  
      "language": "ES",  
      "currency": "COP"
    },  
    {  
      "id": 2,  
      "language": "ES",  
      "currency": "USD" 
    },  
    {  
      "id": 3,  
      "language": "ES",  
      "currency": "EU"  
    },  
    {  
      "id": 4,  
      "language": "EN",  
      "currency": "COP" 
    },  
    {  
      "id": 5,  
      "language": "EN",  
      "currency": "USD"  
    },
    {  
        "id": 6,  
        "language": "EN",  
        "currency": "EU"  
    }  
  ]  

}
