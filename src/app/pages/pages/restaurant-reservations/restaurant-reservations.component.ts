import { Component, OnInit } from '@angular/core';
import { RestaurantTypeService } from '../../../services/restaurantType.service'; 
import { GenericService } from '../../../services/generic.service';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from '../../../services/reservation.service';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-restaurant-reservations',
  templateUrl: './restaurant-reservations.component.html',
  styleUrl: '../../adminPages/admin-layout/admin-layout.component.scss'
})
export class RestaurantReservationsComponent implements OnInit{
  reservations: any[] = []; 

  errorMessage : string = ''
  id : any
  searchQuery: string = '';

  isVisible : boolean = false;
  perPage : number = 5;
  totalCount : number = this.perPage;

  constructor(private reservationService:ReservationService, 
              private genericService: GenericService, 
              private route: ActivatedRoute,
              private authService: AuthService
            ){

  }

  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      this.id = params['id']; 
      this.getReservations(this.authService.getUserFromToken().Id ,this.id)
    });


  }

  loadMore(){
    this.totalCount += this.perPage;
    this.getReservations(this.authService.getUserFromToken().Id ,this.id);
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value; 
    this.getReservations(this.authService.getUserFromToken().Id, this.id)
  }

  getReservations(userId:any, restaurantId:any): void {
    this.reservationService.getReservationsForRestaurant(userId ,restaurantId, this.searchQuery, this.totalCount).subscribe(
      (response: any) => {  
        this.reservations = response.data;
        //console.log(response.data)
        if(response.totalCount > this.perPage){
          this.isVisible = true
        }
        if(response?.totalCount <= this.totalCount){
          this.isVisible = false;
        }
      },
      (error) => {
        console.error('There was an error', error);
      }
    );
  }

  accept(r: any) {
    this.reservationService.accept(r.id).subscribe(
      response => {
        r.isAccepted = true
      },
      error => {
     
      }
    );
  }

  realised(r: any) {
    this.reservationService.realise(r.id).subscribe(
      response => {
        r.isRealised = true
      },
      error => {
       
      }
    );
  }

  delete(id: number) {
    this.genericService.deleteEntity(id, 'Reservations').subscribe(
      response => {
        this.reservations = this.reservations.filter(x => x.id != id);
      },
      error => {
        if(error.status == 409){
          this.errorMessage = "The category cannot be deleted because it exists in other tables."
        }else{
          this.errorMessage = 'An error occurred, please try again later.';
        }
      }
    );
  }
}
