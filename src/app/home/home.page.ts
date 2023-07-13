import { ChangeDetectorRef, Component } from '@angular/core';
import { DataService, Note } from '../services/data.service';
import { AlertController, ModalController  } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  notes: Note[] = [];


  constructor(private dataService: DataService,  private cd: ChangeDetectorRef, private alertCtrl: AlertController, private modalCtrl: ModalController) {
    this.dataService.getNotes().subscribe(res => {
      this.notes = res;
      this.cd.detectChanges();
    });
  }

  async addNote() {
    const alert = await this.alertCtrl.create({
      header: 'Add Note',
      inputs: [
        {
          name: 'titulo',
          placeholder: 'Pon el titulo',
          type: 'text'
        },
        {
          name: 'fecha',
          placeholder: 'Coloca la fecha',
          type: 'date'
        },

        {
          name: 'descripcion',
          placeholder: 'Agrega tu descripcion',
          type: 'textarea'
        },

        {
          name: 'foto',
          placeholder: 'URL de la foto',
          type: 'textarea'
        },

        {
          name: 'audio',
          placeholder: 'Sube tu audio',
          type: 'textarea',
          
        },


      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Add',
          handler: res => {
            this.dataService.addNote({
              titulo: res.titulo, fecha: res.fecha,
              descripcion: res.descripcion,
              foto: res.foto,
              audio: res.audio
            });
          }
        }
      ]
    });

    await alert.present();
  }


  async openNote(note: Note) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { id: note.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8
    });

    await modal.present();
  }
}
