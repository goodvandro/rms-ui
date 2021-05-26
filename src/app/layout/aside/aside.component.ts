import { Component, OnInit } from '@angular/core';
import $ from "jquery";

// class Details {
//   group;
//   details;
//   toggles;
//   contents;
//   settings;

//   constructor(el, settings) {
// this.group = el;
// this.details = this.group.getElementsByClassName("details");
// this.toggles = this.group.getElementsByClassName("details__summary");
// this.contents = this.group.getElementsByClassName("details__content");

// // Set default settings if necessary
// this.settings = Object.assign({
//   speed: 300,
//   one_visible: false
// }, settings);

// // Setup inital positions
// for (let i = 0; i < this.details.length; i++) {
//   const detail = this.details[i];
//   const toggle = this.toggles[i];
//   const content = this.contents[i];

//   // Set transition-duration to match JS setting
//   detail.style.transitionDuration = this.settings.speed + "ms";

//   // Set initial height to transition from
//   if (!detail.hasAttribute("open")) {
//     detail.style.height = toggle.clientHeight + "px";
//   } else {
//     detail.style.height = toggle.clientHeight + content.clientHeight + "px";
//   }
// }

// // Setup click handler
// this.group.addEventListener("click", (e) => {
//   if (e.target.classList.contains("details__summary")) {
//     e.preventDefault();

//     let num = 0;
//     for (let i = 0; i < this.toggles.length; i++) {
//       if (this.toggles[i] === e.target) {
//         num = i;
//         break;
//       }
//     }

//     if (!e.target.parentNode.hasAttribute("open")) {
//       this.open(num);
//     } else {
//       this.close(num);
//     }
//   }
// });
// }

//   open(i) {
//     const detail = this.details[i];
//     const toggle = this.toggles[i];
//     const content = this.contents[i];

//     // If applicable, hide all the other details first
//     if (this.settings.one_visible) {
//       for (let a = 0; a < this.toggles.length; a++) {
//         if (i !== a) this.close(a);
//       }
//     }

//     // Update class
//     detail.classList.remove("is-closing");

//     // Get height of toggle
//     const toggle_height = toggle.clientHeight;

//     // Momentarily show the contents just to get the height
//     detail.setAttribute("open", true);
//     const content_height = content.clientHeight;
//     detail.removeAttribute("open");

//     // Set the correct height and let CSS transition it
//     detail.style.height = toggle_height + content_height + "px";

//     // Finally set the open attr
//     detail.setAttribute("open", true);
//   }

//   close(i) {
//     const detail = this.details[i];
//     const toggle = this.toggles[i];

//     // Update class
//     detail.classList.add("is-closing");

//     // Get height of toggle
//     const toggle_height = toggle.clientHeight;

//     // Set the height so only the toggle is visible
//     detail.style.height = toggle_height + "px";

//     setTimeout(() => {
//       // Check if still closing
//       if (detail.classList.contains("is-closing"))
//         detail.removeAttribute("open");
//       detail.classList.remove("is-closing");
//     }, this.settings.speed);
//   }
// }

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //   (() => {
    //     const els = document.getElementsByClassName("details-group");

    //     for (let i = 0; i < els.length; i++) {
    //       const details = new Details(els[i], {
    //         speed: 500,
    //         one_visible: true
    //       });
    //     }
    //   })();

    $('.sub-menu ul').hide();
    $(".sub-menu a").click(function () {
      $(this).parent(".sub-menu").children("ul").slideToggle("100");
      $(this).find(".right").toggleClass("pi-angle-up pi-angle-down");
    });
  }
}
