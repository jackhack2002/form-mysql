import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-get-info',
  templateUrl: './get-info.component.html',
  styleUrls: ['./get-info.component.scss']
})
export class GetInfoComponent {
  studentData: any;

  constructor(private database: DatabaseService) {
  }


  showdata(){

    console.log(this.studentData.name);

  }

  getData(getform: any) {
    const data = getform.value;
    this.database.getDataByMobile(data.mobile).subscribe((result) => {
      if (result && result.length > 0) {
        this.studentData = result[0];
      } else {
        alert('Data does not exist for the given mobile number.');
      }
    });
    getform.reset();
  }



}
