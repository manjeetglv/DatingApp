import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from "../../../_services/user.service";
import {AlertifyService} from "../../../_services/alertify.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../_models/User";
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from "ngx-gallery-9";

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MemberDetailComponent implements OnInit {
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(private userService: UserService,
              private alertifyService: AlertifyService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // Here I used resolver to fetch user details. But in other components I am getting data directly in ngOnInit.
    this.activatedRoute.data.subscribe(data => {
      this.user = data['user'];
    })
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];

    this.galleryImages = this.getImages();
  }

  getImages() {
    const imageUrls = [];
    for (const photo of this.user.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.description
      })
    }
    return imageUrls;
  }
}
