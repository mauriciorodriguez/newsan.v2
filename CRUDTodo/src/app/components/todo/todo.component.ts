import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  listTodos: any[] = [];
  form: FormGroup;
  toastTiemOut: number;
  archivoBase64: any;
  archivoTipo: any;
  archivoNombre: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _todoService: TodoService
  ) {
    this.toastTiemOut = 2000;
    this.form = this.fb.group({
      descripcion: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.obtenerTodos();
  }

  obtenerTodos() {
    this._todoService.getListTodo().subscribe(
      (data) => {
        this.listTodos = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  obtenerTodoPorId(id: String) {
    if (id == '') return;
    this.listTodos = [];
    this._todoService.getTodoById(Number(id)).subscribe(
      (data) => {
        this.listTodos.push(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  obtenerTodoPorDesc(desc: String) {
    if (desc == '') return;
    this._todoService.getTodosByDesc(desc).subscribe(
      (data) => {
        this.listTodos = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  obtenerTodoPorEstado(estado: String) {
    if (estado == '') return;
    this._todoService.getTodosByState(estado).subscribe(
      (data) => {
        this.listTodos = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  guardarTodo() {
    // const todo: any = {
    //   descripcion: this.form.get('descripcion')?.value,
    //   estado: this.form.get('estado')?.value,
    //   archivo: this.archivo,
    // };
    const formulario = new FormData();
    formulario.append('descripcion', this.form.get('descripcion')?.value);
    formulario.append('estado', this.form.get('estado')?.value);
    formulario.append('archivo', this.archivoBase64);
    formulario.append('archivoTipo', this.archivoTipo);
    formulario.append('archivoNombre', this.archivoNombre);

    this._todoService.createTodo(formulario).subscribe(
      (data) => {
        this.toastr.success('El TODO fue creado', 'TODO Creado', {
          timeOut: this.toastTiemOut,
        });
        this.form.reset();
        this.obtenerTodos();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  eliminarTodo(id: number) {
    this._todoService.deleteTodo(id).subscribe(
      (data) => {
        this.toastr.error('El TODO fue eliminado', 'TODO Eliminado', {
          timeOut: this.toastTiemOut,
        });
        this.obtenerTodos();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editarTodo(todo: any) {
    todo.estado = 'Realizado';
    this._todoService.updateTodo(todo.id, todo).subscribe(
      (data) => {
        this.toastr.info(
          'El TODO fue actualizado con exito',
          'TODO actualizado'
        );
        this.obtenerTodos();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  obtenerArchivo(e) {
    //this.archivo = e.target.files[0];

    var reader = new FileReader();
    this.archivoNombre = e.target.files[0].name;
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      this.archivoBase64 = reader.result.toString().split(',')[1];
      this.archivoTipo = reader.result.toString().split(/[:;]+/)[1];
    };
  }
}
