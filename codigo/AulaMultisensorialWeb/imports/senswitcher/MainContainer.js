import React, { Component } from 'react';
import Presentation from '../senswitcher/Presentation';

export default class MainContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showSearchBar: false,
          loadingSearchBar: true,
          activitiesRow1: [
            {
              _id: "e1f",
              title: "Experimental 1 - Formas",
              description: "10 formas animadas que no requieren la intervención del usuario. Las formas varían desde una sola estrella hasta un cuadrado que se transforma en un triángulo.",
              show: true,
            },
            {
              _id: "e2p",
              title: "Experimental 2 - Patrones",
              description: "10 patrones animados que no requieren entrada de uso. Los patrones van desde franjas lineales que rastrean la pantalla hasta túneles circulares concéntricos.",
              show: true,
            },
            {
              _id: "p1p",
              title: "Presión 1 - Patrones",
              description: "10 animaciones para pulsar animadas, solo se debe una ocasion.",
              show: true,
            },
            {
              _id: "p2o",
              title: "Presión 2 - Objetos",
              description: "Se debe presionar uan vez. Los 10 objetos son: pelota, cometa, reloj, tambor, nube, un hombre corriendo, arco iris, cohete, fútbol, ​​sol.",
              show: true,
            },
            {
              _id: "pa1p",
              title: "Presión avanzado 1 - Patrones",
              description: "10 patrones animados que se construyen con 3 pulsaciones. Los patrones van desde la construcción de cuadrados de izquierda a derecha hasta los anillos que forman la pantalla.",
              show: true,
            },
          ],
          activitiesRow2: [
            {
              _id: "pa2o",
              title: "Presion Avanzado 2 - Objetos",
              description: "10 objetos animados que se construyen en la pantalla con 3 pulsaciones. Los objetos son tambores, teléfono, gelatina, patatas fritas, reloj, silbato, bomba, fantasma, globo y notas musicales.",
              show: true,
            },
            {
              _id: "p1pl",
              title: "Pulsacion 1 - Patrones Lineales",
              description: "10 patrones animados que no requieren entrada de uso. Los patrones van desde franjas lineales que rastrean la pantalla hasta túneles circulares concéntricos.",
              show: true,
            },
            {
              _id: "p2p",
              title: "Pulsacion 2 - Patrones",
              description: "10 patrones de tunelización animados. Una gama de formas que se construyen en una variedad de formas.",
              show: true,
            },
            {
              _id: "p3e",
              title: "Pulsacion 3 - Escenas",
              description: "10 escenas animadas. Las escenas se basan en los siguientes objetos: nave espacial, paracaídas, automóvil, avión, esquí, ovnis, peces, tractores, elevadores, parques de atracciones.",
              show: true,
            },
            {
              _id: "s1fas",
              title: "Surgimiento 1 - Formas/Animales con sonido",
              description: "4 formas animadas y 4 animales animados de las actividades debajo que se activan cuando el usuario presiona cuando la forma aparece en la pantalla, acompañada de un sonido.",
              show: true,
            },
          ],
          activitiesRow3: [
            {
              _id: "s2f",
              title: "Surgimiento 2 - Formas",
              description: "8 formas animadas que se activan cuando el usuario presiona cuando la forma aparece en la pantalla. Las formas son círculo, estrella, cuatro flechas direccionales, triángulo y diamante.",
              show: true,
            },
            {
              _id: "s3a",
              title: "Surgimiento 3 - Animales",
              description: "8 animales animados que se activan cuando el usuario presiona cuando el animal aparece en la pantalla. Los animales son caballo, vaca, perro, cerdo, pato, rana, abeja y ratón.",
              show: true,
            },
            {
              _id: "f1fo",
              title: "Focalizacion 1 - Formas/Objetos",
              description: "10 formas y objetos que se mueven en una variedad de direcciones a través de la pantalla con animaciones que se activan si el usuario presiona cuando el objeto se mueve hacia el área objetivo.",
              show: true,
            },
            {
              _id: "f2e",
              title: "Focalizacion 2 - Escenas",
              description: "10 escenas en las que el usuario recibe una recompensa de animación si el usuario se activa en el momento adecuado. Los objetos se alinean en direcciones horizontales y verticales.",
              show: true,
            },
            {
              _id: "e1fo",
              title: "Exploracion 1 - Formas/Objetos",
              description: "8 actividades que implican hacer una elección. Las actividades varían desde elegir entre un círculo y un cuadrado hasta seleccionar una bomba en 1 de 3 ranuras.",
              show: true,
            },
          ],
          showActivityDescription: false,
          showActivities: false,
        }
    }

    ShowSearchBar(){
      this.setState({
        showSearchBar: !this.state.showSearchBar,
      }, () => {
        if(!this.state.showSearchBar){
          this.ShowAllActivities();
        }
      });
    }

    SearchActivity(){
      this.ShowActivities();
      this.CloseActivityDescription();
      let search = document.getElementById('senswitcher-search-input').value;
      let activitiesRow1 = this.state.activitiesRow1;
      let activitiesRow2 = this.state.activitiesRow2;
      let activitiesRow3 = this.state.activitiesRow3;
      if(search != ""){
        for (var i = 0; i < activitiesRow1.length; i++) {
          if(activitiesRow1[i].description.includes(search) || activitiesRow1[i].title.includes(search)){
            activitiesRow1[i].show = true;
          }
          else{
            activitiesRow1[i].show = false;
          }
        }
        for (var i = 0; i < activitiesRow2.length; i++) {
          if(activitiesRow2[i].description.includes(search) || activitiesRow2[i].title.includes(search)){
            activitiesRow2[i].show = true;
          }
          else{
            activitiesRow2[i].show = false;
          }
        }
        for (var i = 0; i < activitiesRow3.length; i++) {
          if(activitiesRow3[i].description.includes(search) || activitiesRow3[i].title.includes(search)){
            activitiesRow3[i].show = true;
          }
          else{
            activitiesRow3[i].show = false;
          }
        }
      }
      else{
        this.ShowAllActivities();
      }
      this.setState({
        activitiesRow1: activitiesRow1,
        activitiesRow2: activitiesRow2,
        activitiesRow3: activitiesRow3,
      });
    }

    ShowAllActivities(){
      let activitiesRow1 = this.state.activitiesRow1;
      let activitiesRow2 = this.state.activitiesRow2;
      let activitiesRow3 = this.state.activitiesRow3;
      for (var i = 0; i < activitiesRow1.length; i++) {
        activitiesRow1[i].show = true;
      }
      for (var i = 0; i < activitiesRow2.length; i++) {
        activitiesRow2[i].show = true;
      }
      for (var i = 0; i < activitiesRow3.length; i++) {
        activitiesRow3[i].show = true;
      }
      this.setState({
        activitiesRow1: activitiesRow1,
        activitiesRow2: activitiesRow2,
        activitiesRow3: activitiesRow3,
      });
    }

    ShowActivityDescription(row, description){
      if(row == 1){
        document.getElementById('activities-row-2').style.display = "none";
        document.getElementById('activities-row-3').style.display = "none";
      }
      if(row == 2){
        document.getElementById('activities-row-1').style.display = "none";
        document.getElementById('activities-row-3').style.display = "none";
      }
      if(row == 3){
        document.getElementById('activities-row-1').style.display = "none";
        document.getElementById('activities-row-2').style.display = "none";
      }
      this.setState({
        showActivityDescription: true,
      }, () => {
        document.getElementById('activity-description').innerHTML = description;
      });
    }

    CloseActivityDescription(){
      this.setState({
        showActivityDescription: false,
      }, () => {
        document.getElementById('activities-row-1').style.display = "flex";
        document.getElementById('activities-row-2').style.display = "flex";
        document.getElementById('activities-row-3').style.display = "flex";
      });
    }

    ShowActivities(){
      this.setState({
        showActivities: true,
      });
    }

    ShowLoadingSearchBar(){
      setTimeout(() => {
            this.setState({
            loadingSearchBar: false
          })
        }, 4000);
    }

    componentDidMount(){
      this.ShowLoadingSearchBar();
    }

    render() {
        return(
            <div>
              <div className="senswitcher-main-container">
                <div className="senswitcher-title-container">
                  <div className="senswitcher-fuvime-icon"></div>
                  <div className="senswitcher-title">Fundación Virgen de la Merced</div>
                  {
                    !this.state.loadingSearchBar ?
                      <div className="search-bar">
                        {
                          this.state.showSearchBar ?
                            <input onKeyUp={() => this.SearchActivity()} onKeyPress={() => this.SearchActivity()} onKeyDown={() => this.SearchActivity()} placeholder="Ingrese el tipo de actividad..." id="senswitcher-search-input" className="search-input"></input>
                          :
                          undefined
                        }
                        <div onClick={() => this.ShowSearchBar()} id="senswitcher-search-icon" className="search-icon"></div>
                      </div>
                    :
                    undefined
                  }
                </div>
                <Presentation
                  showActivities={this.state.showActivities}
                  activitiesRow1={this.state.activitiesRow1}
                  activitiesRow2={this.state.activitiesRow2}
                  activitiesRow3={this.state.activitiesRow3}
                  showActivityDescription={this.state.showActivityDescription}
                  ShowActivityDescription={this.ShowActivityDescription.bind(this)}
                  CloseActivityDescription={this.CloseActivityDescription.bind(this)}
                  ShowActivities={this.ShowActivities.bind(this)}/>
              </div>
            </div>
        );
    }
}
