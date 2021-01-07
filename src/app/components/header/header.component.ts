import { Component, OnInit } from "@angular/core";

//Import Router
import { Router } from "@angular/router";

//Import Auth service
import { AuthService } from "../../services/auth.service";

//Import category service
import { CategoryService } from "src/app/services/category.service";
import { Category } from "src/app/models/Category";

declare var $: any;

interface ReducedCategories {
  [categoryId: string]: {
    _id: string;
    name: string;
    image: string;
    bannerImage: string;
    slug: string;
    isSubCategory: boolean;
    subCategories: string[];
  };
}

interface Menu {
  _id: string;
  name: string;
  image: string;
  bannerImage: string;
  slug: string;
  isSubCategory: boolean;
  subMenu: Menu[];
}

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  categories: Category[];
  currentUser: any;
  menu: Menu[];
  giantMenu: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private categoryService: CategoryService
  ) {
    this.authService.currentUser.subscribe(x => (this.currentUser = x));
  }

  _generateMenuFromCategory(categories: Category[]): Menu[] {
    const reducedCategories: ReducedCategories = categories.reduce(
      (menu, category) => {
        menu[category._id] = {
          ...category,
          subCategories: []
        };

        if (category.isSubCategory && category.parentCategory) {
          menu[category.parentCategory].subCategories.push(category._id);
        }

        return menu;
      },
      {}
    );

    const populateMenu = (categoryIds: string[]): Menu[] => {
      if (categoryIds.length < 1) {
        return [];
      }

      return categoryIds.map(categoryId => {
        const category = reducedCategories[categoryId];
        return {
          _id: category._id,
          name: category.name,
          image: category.image,
          bannerImage: category.bannerImage,
          slug: category.slug,
          isSubCategory: category.isSubCategory,
          subMenu: populateMenu(category.subCategories)
        };
      });
    };

    const generatedMenu = populateMenu(Object.keys(reducedCategories)).filter(
      menu => !menu.isSubCategory
    );

    return generatedMenu;
  }

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories.data;
      const menu = this._generateMenuFromCategory(this.categories);

      this.menu = menu.sort((prevMenu, nextMenu) =>
        prevMenu.name.localeCompare(nextMenu.name)
      );

      this.giantMenu = [];

      const section = 16;
      for (let i = 0, length = this.menu.length; i < length; i += section) {
        this.giantMenu.push(this.menu.slice(i, i + section));
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  ngAfterViewInit() {
    // $("ul.dropdown-menu .dropdown-toggle").click(function(e: any) {
    $("div.dropdown-menu").on("click", ".dropdown-toggle", function(e: any) {
      e.preventDefault();
      e.stopPropagation();

      if (
        !$(this)
          .next()
          .hasClass("show")
      ) {
        $(this)
          .parents(".dropdown-menu")
          .first()
          .find(".show")
          .removeClass("show");
      }

      const subMenu = $(this).next(".dropdown-menu");
      subMenu.toggleClass("show");

      $(this)
        .parents("li.nav-item.dropdown.show")
        .on("hidden.bs.dropdown", function() {
          $(".dropdown-submenu .show").removeClass("show");
        });

      return false;
    });
  }
}
