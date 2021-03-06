import { Component, OnInit } from "@angular/core";
import { User } from "../user";
import { UserService } from "../user.service";
import { Router } from "@angular/router";

@Component({
  selector: "dream-list-users",
  templateUrl: "./list-users.component.html",
  styleUrls: ["./list-users.component.css"]
})
export class ListUsersComponent implements OnInit {
  users: User[];
  imgUrl: string;

  // DI. Injecting the service object and initialzing
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe(response => {
      this.users = response;
    });
  }

  addUser(): void {
    // navigate to add User component
    // give the path while navigation
    this.router.navigate(['add-user']);
  }

  deleteUser(user): void {
    this.userService.deleteUser(user.id).subscribe(response => {
      // need to delete from the array as well
      // js method called as filter
      this.users = this.users.filter(u => u !== user);
    });
  }

  editUser(user): void {
    // naigating to the edit user page and passing a route parameter = user.id
    this.router.navigate(['edit-user', user.id]);
  }
}
