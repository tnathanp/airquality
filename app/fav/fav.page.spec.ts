import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FavPage } from './fav.page';

describe('FavPage', () => {
  let component: FavPage;
  let fixture: ComponentFixture<FavPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FavPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FavPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
