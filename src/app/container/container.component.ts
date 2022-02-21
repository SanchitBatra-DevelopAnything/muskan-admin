import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  constructor(private imageService : ImageService) { }

  ngOnInit(): void {
    this.imageService.getCategories(); // to initialize categories node in DB.
  }

}
