import { Component, OnInit } from "@angular/core";

declare var tp: any;

@Component({
  selector: "app-trust-pilot-reviews",
  templateUrl: "./trust-pilot-reviews.component.html",
  styleUrls: ["./trust-pilot-reviews.component.css"]
})
export class TrustPilotReviewsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    const script = document.getElementsByTagName("script")[0];

    const trustpilot = document.createElement("script");
    trustpilot.type = "text/javascript";
    trustpilot.async = true;
    trustpilot.src =
      "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";

    script.parentNode.insertBefore(trustpilot, script);
  }
}
