import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  espacio: any;

  constructor(private espacioService: CrudService, private route: ActivatedRoute, private router: Router) {
    console.log(this.route.snapshot.params['id']);
    this.espacioService.model = 'spaces';
  }
  ngOnInit(): void {
    
    this.espacioService.getData(this.route.snapshot.params['id']).subscribe((data: any) => {
      this.espacio = data;
    });

  }

  reservarEspacio() {
    this.router.navigate(['reservas/mis-reservas/create'], { 
      queryParams: { 
        espacioId: this.espacio.id,
        espacioNombre: this.espacio.name,
        espacioCapacidad: this.espacio.capacity
      }
    });
  }

  volver() {
    this.router.navigate(['/espacios/list']);
  }
}
