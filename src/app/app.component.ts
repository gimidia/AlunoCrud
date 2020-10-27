import { Component, OnInit } from '@angular/core';
import { AlunoService } from './services/aluno.service';
import { Aluno } from './models/aluno';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  aluno = {} as Aluno;
  alunos: Aluno[];

  constructor(private alunoService: AlunoService) {}
  
  ngOnInit() {
    this.getAlunos();
  }

  // defini se um aluno será criado ou atualizado
  saveAluno(form: NgForm) {
    if (this.aluno.alunoId !== undefined) {
      this.alunoService.updateAluno(this.aluno).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.alunoService.saveAluno(this.aluno).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos os alunos
  getAlunos() {
    this.alunoService.getAlunos().subscribe((alunos: Aluno[]) => {
      this.alunos = alunos;
    });
  }

  // deleta um aluno
  deleteAluno(aluno: Aluno) {
    this.alunoService.deleteAluno(aluno).subscribe(() => {
      this.getAlunos();
    });
  }

  // copia o aluno para ser editado.
  editAluno(aluno: Aluno) {
    this.aluno = { ...aluno };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getAlunos();
    form.resetForm();
    this.aluno = {} as Aluno;
  }

}