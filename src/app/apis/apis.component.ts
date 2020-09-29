import { Component, OnInit, InjectionToken } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from './api.service';
import { SwaggerUIBundle, HideTopbarPlugin } from "swagger-ui-dist";
import { Router } from '@angular/router';

@Component({
  selector: 'app-apis',
  templateUrl: './apis.component.html',
  styleUrls: ['./apis.component.css']
})

export class ApisComponent implements OnInit { 

  control: FormControl;
  customErrors = {required: 'Please accept the terms'}

  showThrottlingPolicies: boolean = false;
  showCorsConfiguration: boolean = false;
  showBlockIfInError: boolean = false;
  showSwaggerDefinition: boolean = false;
  swaggerEndpointToLoad: string;

  apiFormGroup: FormGroup;

  activeIdString: string ="1";

  overviewApiName: string;
  overviewApiContext: string;
  overviewEndpointType: boolean;
  overviewSecured: boolean;
  overviewSwaggerEndpoint: string;
  overviewClientID: string;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService,  private router: Router) { }

  ngOnInit() {
    this.control = this.formBuilder.control('', Validators.required);
    this.apiFormGroup = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      context: [null, [Validators.required, Validators.minLength(3)]],
      endpointType: [null, [Validators.required]],
      secured: [null],
      swaggerEndpoint: [null, [Validators.required]],
      throttlingPolicies: [null, [Validators.required]],
      corsEnabled: [null, [Validators.required]],
      maxCallsAllowed: [null],
      applyPerPath: [null],
      periodForMaxCalls: [null],
      blockIfInError: [null],
      maxAllowedFailedCalls: [null],
      unblockAfter: [null],
      unblockAfterMinutes: [null],
      clientID: [null],
      endpoints: this.formBuilder.array([
        this.formBuilder.control('')
      ]),
      allowedOrigins: this.formBuilder.array([
        this.formBuilder.control('')
      ])

      
    });

    this.onChanges();

    /*this.apiService.getApis()
      .subscribe(data => {
        console.log(data);
      });*/
  }

  switchNgBTab(id: string) {
    this.activeIdString = id;
  }

  onEnter() {
    this.addEndpoint();
  }

  addEndpoint() {
    this.endpoints.push(this.formBuilder.control(''));
  }

  addOrigin() {
    this.allowedOrigins.push(this.formBuilder.control(''));
  }

  get endpoints() {
    return this.apiFormGroup.get('endpoints') as FormArray;
  }

  get allowedOrigins() {
    return this.apiFormGroup.get('allowedOrigins') as FormArray;
  }

  removeEndpoint(i: number) {
    let localArray = this.apiFormGroup.get('endpoints') as FormArray;
    if(localArray.length > 1) {
      this.endpoints.removeAt(i);
    } 
  }

  removeOrigin(i: number) {
    let localArray = this.apiFormGroup.get('allowedOrigins') as FormArray;
    if(localArray.length > 1) {
      this.allowedOrigins.removeAt(i);
    } 
  }

  onChanges(): void {

    this.apiFormGroup.valueChanges.subscribe(val => {

      if (val.throttlingPolicies) {
        this.showThrottlingPolicies = true;
      } else {
        this.showThrottlingPolicies = false;
      }

      if (val.corsEnabled) {
        this.showCorsConfiguration = true;
      } else {
        this.showCorsConfiguration = false;
      }

      if (val.blockIfInError) {
        this.showBlockIfInError = true;
      } else {
        this.showBlockIfInError = false;
      }

      if (val.swaggerEndpoint != null) {
        this.swaggerEndpointToLoad = val.swaggerEndpoint;
        this.overviewSwaggerEndpoint = val.swaggerEndpoint;
      }

      if(val.name != null && val.name.length > 3) {
        this.overviewApiName = val.name;
      }

      if(val.context != null && val.context.length > 4) {
        this.overviewApiContext = val.context;
      }

      if(val.endpointType != null) {
        this.overviewEndpointType = val.endpointType;
      }

      if(val.secured != null) {
        this.overviewSecured = val.secured;
      }

      if(val.clientID != null && val.clientID.length > 4) {
        this.overviewClientID = val.clientID;
      }
    });
  }

  previewSwagger(): void {
    this.showSwaggerDefinition = true;
    const ui = SwaggerUIBundle({
      url: this.swaggerEndpointToLoad,
      dom_id: '#swagger-ui',
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIBundle.SwaggerUIStandalonePreset
      ],
      plugins: [
        HideTopbarPlugin
      ]
    });
  }

  onSubmit() {
    if(this.apiFormGroup.value.secured == null) {
      this.apiFormGroup.value.secured = false;
    }
    if(this.apiFormGroup.value.blockIfInError == null) {
      this.apiFormGroup.value.blockIfInError = false;
    }
    if(this.apiFormGroup.value.throttlingPolicies == null) {
      this.apiFormGroup.removeControl("throttlingPolicies");
    }
    this.apiService.postApi(this.apiFormGroup.value)
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['/apis/list']);
       
      });
  }
}