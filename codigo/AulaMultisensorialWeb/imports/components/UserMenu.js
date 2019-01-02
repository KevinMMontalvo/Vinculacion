import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import ButterToast, { Cinnamon, POS_BOTTOM, POS_RIGHT, POS_TOP } from 'butter-toast';

export default class UserMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          openUserMenu: false,
          changePasswordForm: false,
          showOptions: true,
          isTheSamePassword: false,
        }
    }

    onOpenOptionsModal = () => {
      this.setState({ openUserMenu: true });
    };

    onCloseOptionsModal = () => {
      this.setState({ openUserMenu: false, changePasswordForm: false, showOptions: true });
    };

    componentWillReceiveProps(){
      this.setState({
        openUserMenu: this.props.openUserMenu,
      })
    }

    Logout(){
      this.props.Logout();
    }

    ShowChangePasswordForm() {
      this.setState({
        changePasswordForm: true,
        showOptions: false,
      });
    }

    VerifySamePassword(){
  		let password = document.getElementById('password-input').value;
  		let passwordToVerify = document.getElementById('password-confirmation-input').value;
  		if(passwordToVerify != "" && password != ""){
  			if (password == passwordToVerify) {
  				document.getElementById('password-confirmation-input').style.borderColor = "#2BBEA2";
  				this.ShowSamePasswordMenssage();
  				this.setState({
  					isTheSamePassword: true,
  				});
  			}
  			else {
  				document.getElementById('password-confirmation-input').style.borderColor = "#CD6155";
  				this.ShowNotTheSamePasswordMenssage();
  				this.setState({
  					isTheSamePassword: false,
  				});
  			}
  		}
  	}

    ShowSamePasswordMenssage()
  	{
  		this.tray.raise({
  			content: <Cinnamon.Crisp
  				className="butter-alert"
  				scheme={Cinnamon.Slim.SCHEME_DARK}
  				content={() => <div>{"Contraseña correcta"}</div>}
  				title={"Las contraseñas coinciden"}
  				icon={<div className="alert-success-icon"></div>}
  			/>
  		});
  		this.dismissAll();
  	}

  	ShowNotTheSamePasswordMenssage()
  	{
  		this.tray.raise({
  			content: <Cinnamon.Crisp
  				className="butter-alert"
  				scheme={Cinnamon.Slim.SCHEME_DARK}
  				content={() => <div>{"Contraseña incorrecta"}</div>}
  				title={"Las contraseñas no coinciden"}
  				icon={<div className="alert-warning-icon"></div>}
  			/>
  		});
  		this.dismissAll();
  	}

  	ShowPasswordNotMatchMenssage()
  	{
  		this.tray.raise({
  			content: <Cinnamon.Crisp
  				className="butter-alert"
  				scheme={Cinnamon.Slim.SCHEME_DARK}
  				content={() => <div>{"Debe confirmar su contraseña para poder continuar"}</div>}
  				title={"Las contraseñas no coinciden"}
  				icon={<div className="alert-warning-icon"></div>}
  			/>
  		});
  		this.dismissAll();
  	}

    ShowModifySuccessMenssage()
  	{
  		this.tray.raise({
  			content: <Cinnamon.Crisp
  				className="butter-alert"
  				scheme={Cinnamon.Slim.SCHEME_DARK}
  				content={() => <div>{"Nueva contraseña actualizada"}</div>}
  				title={"Modificación completa"}
  				icon={<div className="alert-success-icon"></div>}
  			/>
  		});
  	}

    dismissAll = () => {
  			this.tray.dismissAll();
  	}

    ChangePassword(){
      if(this.state.isTheSamePassword){
        let newPassword = document.getElementById('password-input').value;
        teachersController.changeTeacherPassword(this.props.userId, newPassword);
        this.onCloseOptionsModal();
        this.ShowModifySuccessMenssage();
      }

      else {
        this.ShowPasswordNotMatchMenssage();
      }
    }

    render() {
        return(
          <div>
            <div onClick={() => this.onOpenOptionsModal()} className="user-options-container"></div>
            <Modal
              open={this.state.openUserMenu}
              onClose={this.onCloseOptionsModal} center>
              {
                this.state.showOptions ?
                <div className="advanced-menu-options-container">
                  <div className="advanced-menu-title">Opciones de usuario</div>
                  <div id="import-excel" className="advanced-menu-option-container-g">Importar excel (.xlsx)</div>
                  <div onClick={() => this.ShowChangePasswordForm()} id="change-password" className="advanced-menu-option-container-b">Cambiar contraseña</div>
                  <div onClick={() => this.Logout()} id="logout" className="advanced-menu-option-container-b">Cerrar sesión</div>
                </div>
                :
                undefined
              }
              {
                this.state.changePasswordForm ?
                <div className="change-password-container">
                    <div className="advanced-menu-title">Cambiar contraseña</div>
                    <div className="input-container">
    									<input onBlur={() => this.VerifySamePassword()} id="password-input"
    									       placeholder="Nueva contraseña"
    									       className="horizontal-input-user-options"
    											 	 type="password"/>
    								</div>
    								<div className="input-container">
    									<input onKeyDown={() => this.VerifySamePassword()} onKeyUp={() => this.VerifySamePassword()} onKeyPress={() => this.VerifySamePassword()} id="password-confirmation-input"
    									       placeholder="Confirmar contraseña"
    									       className="horizontal-input-user-options"
    											 	 type="password"/>
    								</div>
                    <div className="button-container">
                      <div onClick={() => this.ChangePassword()} className="change-password-button">Aceptar</div>
                    </div>
                </div>
                :
                undefined
              }
            </Modal>
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
