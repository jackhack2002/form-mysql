import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss'],
})
export class StudentInfoComponent implements OnInit {
  userForm!: FormGroup;
  age: number | null = null;
  Total: number | null = null;
  avg_percentage: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private database: DatabaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]+')]],
      mobile: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('[0-9]{10}'),
        ],
      ],
      emailId: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'),
        ],
      ],
      DOB: ['', Validators.required],
      age: ['', Validators.required],
      physics: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      chemistry: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      mathematics: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      total: ['', [Validators.required, Validators.max(300)]],
      avg_percentage: ['', [Validators.required, Validators.max(100)]],
    });
  }

  calculateAge(): void {
    const dobControl = this.userForm.get('DOB');
    if (dobControl) {
      const dob = new Date(dobControl.value);
      const today = new Date();

      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < dob.getDate())
      ) {
        age--;
      }

      this.userForm.patchValue({ age: age });
    }
  }

  calculateTotalAndAvg(): void {
    const physicsControl = this.userForm.get('physics');
    const chemistryControl = this.userForm.get('chemistry');
    const mathematicsControl = this.userForm.get('mathematics');

    if (physicsControl && chemistryControl && mathematicsControl) {
      const physics = +physicsControl.value || 0;
      const chemistry = +chemistryControl.value || 0;
      const mathematics = +mathematicsControl.value || 0;

      const total = physics + chemistry + mathematics;
      const avgPercentage = total / 3;

      this.userForm.patchValue({ total: total });
      this.userForm.patchValue({ avg_percentage: avgPercentage });
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      console.error('Invalid form data. Please check your inputs.');
      return;
    }

    const data = this.userForm.value;
    console.log('Form data:', data);

    this.database.insertData(data).subscribe(
      () => {
        console.log('Student details submitted successfully!');
        this.router.navigate(['/dashboard/get-info']);
      },
      (error) => {
        console.error('Error inserting data:', error);
        // Handle error - show error message or redirect to an error page
      }
    );
  }
}
