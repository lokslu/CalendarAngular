import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/Api/AuthServise';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private AuthS:AuthService) { }
  @Input() Now: Date;
  @Output() change = new EventEmitter();
  public CurDate: string;

  ngOnInit(): void {
    this.CurDate = this.NowDate();

  }
  public ResetNow()
  {
    this.Now.setTime(new Date().getTime());
    this.Now.setHours(12, 0, 0, 0);

    this.change.emit()
    this.CurDate = this.NowDate();


  }
  public SetLeftMonth() {
    this.Now.setMonth(this.Now.getMonth() - 1);
    this.change.emit()
    this.CurDate = this.NowDate();

    console.log(this.Now)

  }
  public SetRightMonth() {
    this.Now.setMonth(this.Now.getMonth() + 1);
    this.change.emit()
    this.CurDate = this.NowDate();

    console.log(this.Now)

  }
  public NowDate() {
    return this.Now.toLocaleDateString('en', { year: 'numeric', month: 'long' })
  }
  logout()
  {
    this.AuthS.logout();
  }
}
