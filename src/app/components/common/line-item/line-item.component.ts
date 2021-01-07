import { Component, OnInit, Input } from '@angular/core';

//Import Cake Service
import {CakeService} from './../../../services/cake.service';

//Import cake model
import {Cake} from './../../../models/Cake';

@Component({
  selector: 'app-line-item',
  templateUrl: './line-item.component.html',
  styleUrls: ['./line-item.component.css']
})
export class LineItemComponent implements OnInit {

  @Input() cakeId: string;
  cake: Cake;
  constructor(private cakeService: CakeService) { }

  ngOnInit() {
    this.cakeService.getCake(this.cakeId).subscribe(cake=>{
      this.cake = cake.data
    })
  }

}
