import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import TechnicalHelp from '../map/TechnicalHelp';
import ButterToast, { Cinnamon, POS_BOTTOM, POS_RIGHT, POS_TOP } from 'butter-toast';

export default class Registry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          age: 0,
          canNotCompleteTheActionMenssage: "No se pudo completar la acción",
        }
    }

    CanNotCompleteTheActionMenssage()
  	{
  		this.tray.raise({
  			content: <Cinnamon.Crisp
  				className="butter-alert"
  				scheme={Cinnamon.Slim.SCHEME_DARK}
  				content={() => <div>{"Vuelva a intentarlo"}</div>}
  				title={this.state.canNotCompleteTheActionMenssage}
  				icon={<div className="wrong-info-icon"></div>}
  			/>
  		});
  	}

    CalculateAge() {
      var birthdate = new Date(this.props.students.birthdate);
      var ageDifMs = Date.now() - birthdate.getTime();
      var ageDate = new Date(ageDifMs);
      this.setState({
        age: Math.abs(ageDate.getUTCFullYear() - 1970),
        birthdate: birthdate,
      });
    }

    LoadLevels() {
  		var levelsString = levelsController.getLevels();
  		var levels = JSON.parse(levelsString);
  		return levels;
  	}

    SearchLevelName(){
      this.setState({
        levels: this.LoadLevels(),
      }, () => {
        for (var i = 0; i < this.state.levels.length; i++) {
          if(this.props.show == "teachers"){
            if(this.state.levels[i]._id == this.props.teachers.level_id){
              this.setState({
                levelName: this.state.levels[i].name,
              });
              break;
            }
          }
          if(this.props.show == "students"){
            if(this.state.levels[i]._id == this.props.students.level_id){
              this.setState({
                levelName: this.state.levels[i].name,
              });
              break;
            }
          }
        }
      });
    }

    ConvertStartDate() {
      var startDate = new Date(this.props.periods.start_date);
      this.setState({
        startDate: startDate,
      });
    }

    componentWillMount(){
      if(this.props.show == "students"){
        this.CalculateAge();
        this.SearchLevelName();
      }
      if(this.props.show == "teachers"){
        this.SearchLevelName();
      }
      if(this.props.show == "periods"){
        this.ConvertStartDate();
      }
    }

    ShowModifyForm(student) {
      this.props.ShowModifyForm(student);
    }

    onOpenModal = () => {
      this.setState({ openDeleteModal: true });
    };

    onCloseModal = () => {
      this.setState({ openDeleteModal: false });
    };

    ShowDeleteConfirmation() {
      this.onOpenModal();
    }

    DeleteStudent(student) {
      if(studentsController.deleteStudent(student._id)){
        this.onCloseModal();
        this.props.ShowDeletedRegistry();
        this.props.UpdateTable();
        logController.insertLog(this.CreateLog(this.props.user._id, "Estudiante borrado exitosamente"));
      }
      else {
        this.CanNotCompleteTheActionMenssage();
        logController.insertLog(this.CreateLog(this.props.user._id, "Fallo en borrar estiudiante"));
      }
    }

    DeleteLevel(level) {
      if(levelsController.deleteLevel(level._id)){
        this.onCloseModal();
        this.props.ShowDeletedRegistry();
        this.props.UpdateTable();
        logController.insertLog(this.CreateLog(this.props.user._id, "Nivel borrado exitosamente"));
      }
      else {
        this.CanNotCompleteTheActionMenssage();
        logController.insertLog(this.CreateLog(this.props.user._id, "Fallo en borrar nivel"));
      }
    }

    DeleteTeacher(teacher) {
      if(teachersController.deleteTeacher(teacher._id)){
        this.onCloseModal();
        this.props.ShowDeletedRegistry();
        this.props.UpdateTable();
        logController.insertLog(this.CreateLog(this.props.user._id, "Profesor borrado exitosamente"));
      }
      else {
        this.CanNotCompleteTheActionMenssage();
        logController.insertLog(this.CreateLog(this.props.user._id, "Fallo en borrar profesor"));
      }
    }

    DeletePeriod(period) {
      if(periodsController.deletePeriod(period._id)){
        this.onCloseModal();
        this.props.ShowDeletedRegistry();
        this.props.UpdateTable();
        logController.insertLog(this.CreateLog(this.props.user._id, "Periodo borrado exitosamente"));
      }
      else {
        this.CanNotCompleteTheActionMenssage();
        logController.insertLog(this.CreateLog(this.props.user._id, "Fallo en borrar periodo"));
      }
    }

    ShowActiveNewPeriodForm(period){
      this.props.ShowActiveNewPeriodForm(period);
    }

    CreateLog(userId, action){
      let log = {
        user_id: userId,
        action: action,
        date: new Date(),
      };
      return log;
    }

    render() {
        return(
            <div>
              {
                this.props.show == "students" && !(this.props.delete || this.props.modify) ?
                  <div className="registry">
                    <div className="identifier-column">{this.props.students.names.charAt(0)}</div>
                    <div className="information-column">
                      <div className="registry-row">
                        <b>Nombre:</b> <p>{this.props.students.names}</p>
                      </div>
                      <div className="registry-row">
                        <b>Apellidos:</b> <p>{this.props.students.surnames}</p>
                      </div>
                      <div className="registry-row">
                        <b>Género:</b> <p>{this.props.students.gender}</p>
                      </div>
                      <div className="registry-row">
                        <b>Diagnostico:</b> <p>{this.props.students.diagnostic}</p>
                      </div>
                      <div className="registry-row">
                        <b>Fecha de naciemiento:</b> <p>{this.state.birthdate.getDate() + ' - ' + (this.state.birthdate. getMonth() + 1) + ' - ' + this.state.birthdate. getUTCFullYear()}</p>
                      </div>
                      <div className="registry-row">
                        <b>Edad:</b> <p>{this.state.age}</p>
                      </div>
                      <div className="registry-row">
                        <b>Condición:</b> <p>{this.props.students.condition}</p>
                      </div>
                      <div className="registry-row">
                        <b>Nivel:</b> <p>{this.state.levelName}</p>
                      </div>
                      <div className="registry-row">
                        <b>Porcentaje de discapacidad:</b> <p>{this.props.students.percentage_of_disability}%</p>
                      </div>
                      <div className="registry-row">
                        <b>Ayudas técnicas:</b>
                        <div className="map-container">
                          {
                            this.props.students.technical_helps.map((techHelps) =>
                              {
                                return <TechnicalHelp remove={false} techHelps={techHelps} key={techHelps._id}></TechnicalHelp>;
                              })
                          }
                        </div>
                      </div>
                    </div>
                    {
                      this.props.modify ?
                        <div onClick={() => this.ShowModifyForm(this.props.students)} className="registry-modify-button"></div>
                      :
                      undefined
                    }
                    {
                      this.props.delete ?
                        <div>
                          <Modal open={this.state.openDeleteModal} onClose={this.onCloseModal} center>
                            <div className="delete-message-container">
                              <p>¿Esta seguro-a que desea eliminar este registro?</p>
                              <div className="delete-mesagge-options">
                                <div onClick={() => this.DeleteStudent(this.props.students)} id="delete-ok" className="delete-mesasage-button">Si</div>
                                <div onClick={() => this.onCloseModal()} id="delete-cancel" className="delete-mesasage-button">No</div>
                              </div>
                            </div>
                          </Modal>
                          <div onClick={() => this.ShowDeleteConfirmation()} className="registry-delete-button"></div>
                        </div>
                      :
                      undefined
                    }
                  </div>
                :
                undefined
              }

              {
                this.props.show == "students" && (this.props.delete || this.props.modify) && this.props.user.level == this.props.students.level_id && this.props.user.type == "teacher" ?
                  <div className="registry">
                    <div className="identifier-column">{this.props.students.names.charAt(0)}</div>
                    <div className="information-column">
                      <div className="registry-row">
                        <b>Nombre:</b> <p>{this.props.students.names}</p>
                      </div>
                      <div className="registry-row">
                        <b>Apellidos:</b> <p>{this.props.students.surnames}</p>
                      </div>
                      <div className="registry-row">
                        <b>Género:</b> <p>{this.props.students.gender}</p>
                      </div>
                      <div className="registry-row">
                        <b>Diagnostico:</b> <p>{this.props.students.diagnostic}</p>
                      </div>
                      <div className="registry-row">
                        <b>Fecha de naciemiento:</b> <p>{this.state.birthdate.getDate() + ' - ' + (this.state.birthdate. getMonth() + 1) + ' - ' + this.state.birthdate. getUTCFullYear()}</p>
                      </div>
                      <div className="registry-row">
                        <b>Edad:</b> <p>{this.state.age}</p>
                      </div>
                      <div className="registry-row">
                        <b>Condición:</b> <p>{this.props.students.condition}</p>
                      </div>
                      <div className="registry-row">
                        <b>Nivel:</b> <p>{this.state.levelName}</p>
                      </div>
                      <div className="registry-row">
                        <b>Porcentaje de discapacidad:</b> <p>{this.props.students.percentage_of_disability}%</p>
                      </div>
                      <div className="registry-row">
                        <b>Ayudas técnicas:</b>
                        <div className="map-container">
                          {
                            this.props.students.technical_helps.map((techHelps) =>
                              {
                                return <TechnicalHelp remove={false} techHelps={techHelps} key={techHelps._id}></TechnicalHelp>;
                              })
                          }
                        </div>
                      </div>
                    </div>
                    {
                      this.props.modify ?
                        <div onClick={() => this.ShowModifyForm(this.props.students)} className="registry-modify-button"></div>
                      :
                      undefined
                    }
                    {
                      this.props.delete ?
                        <div>
                          <Modal open={this.state.openDeleteModal} onClose={this.onCloseModal} center>
                            <div className="delete-message-container">
                              <p>¿Esta seguro-a que desea eliminar este registro?</p>
                              <div className="delete-mesagge-options">
                                <div onClick={() => this.DeleteStudent(this.props.students)} id="delete-ok" className="delete-mesasage-button">Si</div>
                                <div onClick={() => this.onCloseModal()} id="delete-cancel" className="delete-mesasage-button">No</div>
                              </div>
                            </div>
                          </Modal>
                          <div onClick={() => this.ShowDeleteConfirmation()} className="registry-delete-button"></div>
                        </div>
                      :
                      undefined
                    }
                  </div>
                :
                undefined
              }

              {
                this.props.show == "students" && (this.props.delete || this.props.modify) && this.props.user.type == "admin" ?
                  <div className="registry">
                    <div className="identifier-column">{this.props.students.names.charAt(0)}</div>
                    <div className="information-column">
                      <div className="registry-row">
                        <b>Nombre:</b> <p>{this.props.students.names}</p>
                      </div>
                      <div className="registry-row">
                        <b>Apellidos:</b> <p>{this.props.students.surnames}</p>
                      </div>
                      <div className="registry-row">
                        <b>Género:</b> <p>{this.props.students.gender}</p>
                      </div>
                      <div className="registry-row">
                        <b>Diagnostico:</b> <p>{this.props.students.diagnostic}</p>
                      </div>
                      <div className="registry-row">
                        <b>Fecha de naciemiento:</b> <p>{this.state.birthdate.getDate() + ' - ' + (this.state.birthdate. getMonth() + 1) + ' - ' + this.state.birthdate. getUTCFullYear()}</p>
                      </div>
                      <div className="registry-row">
                        <b>Edad:</b> <p>{this.state.age}</p>
                      </div>
                      <div className="registry-row">
                        <b>Condición:</b> <p>{this.props.students.condition}</p>
                      </div>
                      <div className="registry-row">
                        <b>Nivel:</b> <p>{this.state.levelName}</p>
                      </div>
                      <div className="registry-row">
                        <b>Porcentaje de discapacidad:</b> <p>{this.props.students.percentage_of_disability}%</p>
                      </div>
                      <div className="registry-row">
                        <b>Ayudas técnicas:</b>
                        <div className="map-container">
                          {
                            this.props.students.technical_helps.map((techHelps) =>
                              {
                                return <TechnicalHelp remove={false} techHelps={techHelps} key={techHelps._id}></TechnicalHelp>;
                              })
                          }
                        </div>
                      </div>
                    </div>
                    {
                      this.props.modify ?
                        <div onClick={() => this.ShowModifyForm(this.props.students)} className="registry-modify-button"></div>
                      :
                      undefined
                    }
                    {
                      this.props.delete ?
                        <div>
                          <Modal open={this.state.openDeleteModal} onClose={this.onCloseModal} center>
                            <div className="delete-message-container">
                              <p>¿Esta seguro-a que desea eliminar este registro?</p>
                              <div className="delete-mesagge-options">
                                <div onClick={() => this.DeleteStudent(this.props.students)} id="delete-ok" className="delete-mesasage-button">Si</div>
                                <div onClick={() => this.onCloseModal()} id="delete-cancel" className="delete-mesasage-button">No</div>
                              </div>
                            </div>
                          </Modal>
                          <div onClick={() => this.ShowDeleteConfirmation()} className="registry-delete-button"></div>
                        </div>
                      :
                      undefined
                    }
                  </div>
                :
                undefined
              }

              {
                this.props.show == "levels" ?
                  <div className="registry">
                    <div className="identifier-column">{this.props.levels.name.charAt(0)}</div>
                    <div className="information-column">
                      <div className="registry-row">
                        <b>Nombre:</b> <p>{this.props.levels.name}</p>
                      </div>
                      <div className="registry-row">
                        <b>Edad mínima:</b> <p>{this.props.levels.min_age}</p>
                      </div>
                      <div className="registry-row">
                        <b>Edad máxima:</b> <p>{this.props.levels.max_age}</p>
                      </div>
                    </div>
                    {
                      this.props.modify ?
                        <div onClick={() => this.ShowModifyForm(this.props.levels)} className="registry-modify-button"></div>
                      :
                      undefined
                    }
                    {
                      this.props.delete ?
                        <div>
                          <Modal open={this.state.openDeleteModal} onClose={this.onCloseModal} center>
                            <div className="delete-message-container">
                              <p>¿Esta segur@ que desea eliminar este registro?</p>
                              <div className="delete-mesagge-options">
                                <div onClick={() => this.DeleteLevel(this.props.levels)} id="delete-ok" className="delete-mesasage-button">Si</div>
                                <div onClick={() => this.onCloseModal()} id="delete-cancel" className="delete-mesasage-button">No</div>
                              </div>
                            </div>
                          </Modal>
                          <div onClick={() => this.ShowDeleteConfirmation()} className="registry-delete-button"></div>
                        </div>
                      :
                      undefined
                    }
                  </div>
                :
                undefined
              }


              {
                this.props.show == "teachers" && !(this.props.delete || this.props.modify) ?
                  <div className="registry">
                    <div className="identifier-column">{this.props.teachers.name.charAt(0)}</div>
                    <div className="information-column">
                      <div className="registry-row">
                        <b>Nombre:</b> <p>{this.props.teachers.name}</p>
                      </div>
                      <div className="registry-row">
                        <b>Nivel:</b> <p>{this.state.levelName}</p>
                      </div>
                      <div className="registry-row">
                        <b>Especialidad:</b> <p>{this.props.teachers.speciality}</p>
                      </div>
                    </div>
                    {
                      this.props.modify ?
                        <div onClick={() => this.ShowModifyForm(this.props.teachers)} className="registry-modify-button"></div>
                      :
                      undefined
                    }
                    {
                      this.props.delete ?
                        <div>
                          <Modal open={this.state.openDeleteModal} onClose={this.onCloseModal} center>
                            <div className="delete-message-container">
                              <p>¿Esta segur@ que desea eliminar este registro?</p>
                              <div className="delete-mesagge-options">
                                <div onClick={() => this.DeleteTeacher(this.props.teachers)} id="delete-ok" className="delete-mesasage-button">Si</div>
                                <div onClick={() => this.onCloseModal()} id="delete-cancel" className="delete-mesasage-button">No</div>
                              </div>
                            </div>
                          </Modal>
                          <div onClick={() => this.ShowDeleteConfirmation()} className="registry-delete-button"></div>
                        </div>
                      :
                      undefined
                    }
                  </div>
                :
                undefined
              }


              {
                this.props.show == "teachers" && (this.props.delete || this.props.modify) && this.props.user._id == this.props.teachers._id && this.props.user.type == "teacher" ?
                  <div className="registry">
                    <div className="identifier-column">{this.props.teachers.name.charAt(0)}</div>
                    <div className="information-column">
                      <div className="registry-row">
                        <b>Nombre:</b> <p>{this.props.teachers.name}</p>
                      </div>
                      <div className="registry-row">
                        <b>Nivel:</b> <p>{this.state.levelName}</p>
                      </div>
                      <div className="registry-row">
                        <b>Especialidad:</b> <p>{this.props.teachers.speciality}</p>
                      </div>
                    </div>
                    {
                      this.props.modify ?
                        <div onClick={() => this.ShowModifyForm(this.props.teachers)} className="registry-modify-button"></div>
                      :
                      undefined
                    }
                    {
                      this.props.delete ?
                        <div>
                          <Modal open={this.state.openDeleteModal} onClose={this.onCloseModal} center>
                            <div className="delete-message-container">
                              <p>¿Esta segur@ que desea eliminar este registro?</p>
                              <div className="delete-mesagge-options">
                                <div onClick={() => this.DeleteTeacher(this.props.teachers)} id="delete-ok" className="delete-mesasage-button">Si</div>
                                <div onClick={() => this.onCloseModal()} id="delete-cancel" className="delete-mesasage-button">No</div>
                              </div>
                            </div>
                          </Modal>
                          <div onClick={() => this.ShowDeleteConfirmation()} className="registry-delete-button"></div>
                        </div>
                      :
                      undefined
                    }
                  </div>
                :
                undefined
              }


              {
                this.props.show == "teachers" && (this.props.delete || this.props.modify) && this.props.user.type == "admin" ?
                  <div className="registry">
                    <div className="identifier-column">{this.props.teachers.name.charAt(0)}</div>
                    <div className="information-column">
                      <div className="registry-row">
                        <b>Nombre:</b> <p>{this.props.teachers.name}</p>
                      </div>
                      <div className="registry-row">
                        <b>Nivel:</b> <p>{this.state.levelName}</p>
                      </div>
                      <div className="registry-row">
                        <b>Especialidad:</b> <p>{this.props.teachers.speciality}</p>
                      </div>
                    </div>
                    {
                      this.props.modify ?
                        <div onClick={() => this.ShowModifyForm(this.props.teachers)} className="registry-modify-button"></div>
                      :
                      undefined
                    }
                    {
                      this.props.delete ?
                        <div>
                          <Modal open={this.state.openDeleteModal} onClose={this.onCloseModal} center>
                            <div className="delete-message-container">
                              <p>¿Esta segur@ que desea eliminar este registro?</p>
                              <div className="delete-mesagge-options">
                                <div onClick={() => this.DeleteTeacher(this.props.teachers)} id="delete-ok" className="delete-mesasage-button">Si</div>
                                <div onClick={() => this.onCloseModal()} id="delete-cancel" className="delete-mesasage-button">No</div>
                              </div>
                            </div>
                          </Modal>
                          <div onClick={() => this.ShowDeleteConfirmation()} className="registry-delete-button"></div>
                        </div>
                      :
                      undefined
                    }
                  </div>
                :
                undefined
              }

              {
                this.props.show == "periods" ?
                  <div className="registry">
                    <div className="identifier-column">{this.props.periods.name.charAt(0)}</div>
                    <div className="information-column">
                      <div className="registry-row">
                        <b>Nombre:</b> <p>{this.props.periods.name}</p>
                      </div>
                      <div className="registry-row">
                        <b>Fecha de inicio:</b> <p>{this.state.startDate.getDate() + ' - ' + (this.state.startDate.getMonth() + 1) + ' - ' + this.state.startDate.getUTCFullYear()}</p>
                      </div>
                    </div>
                    {
                      this.props.modify ?
                        <div onClick={() => this.ShowModifyForm(this.props.periods)} className="registry-modify-button"></div>
                      :
                      undefined
                    }
                    {
                      this.props.delete && !this.props.periods.is_visible ?
                        <div>
                          <Modal open={this.state.openDeleteModal} onClose={this.onCloseModal} center>
                            <div className="delete-message-container">
                              <p>¿Esta segur@ que desea eliminar este registro?</p>
                              <div className="delete-mesagge-options">
                                <div onClick={() => this.DeletePeriod(this.props.periods)} id="delete-ok" className="delete-mesasage-button">Si</div>
                                <div onClick={() => this.onCloseModal()} id="delete-cancel" className="delete-mesasage-button">No</div>
                              </div>
                            </div>
                          </Modal>
                          <div onClick={() => this.ShowDeleteConfirmation()} className="registry-delete-button"></div>
                        </div>
                      :
                      undefined
                    }
                    {
                      this.props.active && !this.props.periods.is_visible ?
                        <div onClick={() => this.ShowActiveNewPeriodForm(this.props.periods)} className="registry-active-button"></div>
                      :
                      undefined
                    }
                  </div>
                :
                undefined
              }
              <ButterToast
      					position={{
      						vertical: POS_TOP,
      						horizontal: POS_RIGHT
      					}}
      					timeout={7500}
      					ref={tray => this.tray = tray}
      				/>
            </div>
        );
    }
}
