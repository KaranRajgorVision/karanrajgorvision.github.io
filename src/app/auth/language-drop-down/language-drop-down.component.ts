import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-language-drop-down',
  templateUrl: './language-drop-down.component.html',
  styleUrls: ['./language-drop-down.component.scss']
})
export class LanguageDropDownComponent {
  @Output() selectedLanguageOut = new EventEmitter<string>();
  languageList = [
    {
      text:"English",
      value:"en"
    },
    {
      text:"German",
      value:"de"
    }
  ];
  selectedLanguage: string = "en";

  constructor() {

  }

  onLangSelection(){
    this.selectedLanguageOut.emit(this.selectedLanguage);
  }
}
