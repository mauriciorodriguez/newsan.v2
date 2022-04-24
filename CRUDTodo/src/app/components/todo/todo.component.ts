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

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _todoService: TodoService
  ) {
    this.toastTiemOut = 1500;
    this.form = this.fb.group({
      descripcion: ['', Validators.required],
      estado: ['', Validators.required],
      archivo: [''],
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
    console.log(this.listTodos);
  }

  guardarTodo() {
    const todo: any = {
      descripcion: this.form.get('descripcion')?.value,
      estado: this.form.get('estado')?.value,
      archivo: this.form.get('archivo')?.value,
    };
    this._todoService.createTodo(todo).subscribe(
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
}
