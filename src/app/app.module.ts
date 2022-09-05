import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { Pagina1Component } from './components/pagina1/pagina1.component';
import { Pagina2Component } from './components/pagina2/pagina2.component';
import { FormProdutoComponent } from './components/form-produto/form-produto.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { DeleteProdutoComponent } from './components/delete-produto/delete-produto.component';
import { DeleteTransacaoComponent } from './components/delete-transacao/delete-transacao.component';
import { FormTransacaoComponent } from './components/form-transacao/form-transacao.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginaPrincipalComponent,
    Pagina1Component,
    Pagina2Component,
    FormProdutoComponent,
    DeleteProdutoComponent,
    DeleteTransacaoComponent,
    FormTransacaoComponent,
  ],
  imports: [
    BrowserModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatTableModule,
    AppRoutingModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatNativeDateModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
