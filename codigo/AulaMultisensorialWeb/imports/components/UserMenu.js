import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

export default class UserMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          openUserMenu: false,
        }
    }

    onOpenOptionsModal = () => {
      this.setState({ openUserMenu: true });
    };

    onCloseOptionsModal = () => {
      this.setState({ openUserMenu: false });
    };

    componentWillReceiveProps(){
      this.setState({
        openUserMenu: this.props.openUserMenu,
      })
    }

    Logout(){
      this.props.Logout();
    }

    render() {
        return(
          <div>
            <div onClick={() => this.onOpenOptionsModal()} className="user-options-container"></div>
            <Modal
              open={this.state.openUserMenu}
              onClose={this.onCloseOptionsModal} center>
              <div className="advanced-menu-options-container">
                <div className="advanced-menu-title">Opciones de usuario</div>
                <div id="import-excel" className="advanced-menu-option-container-g">Importar excel (.xlsx)</div>
                <div id="change-password" className="advanced-menu-option-container-b">Cambiar contraseña</div>
                <div onClick={() => this.Logout()} id="logout" className="advanced-menu-option-container-b">Cerrar sesión</div>
              </div>
            </Modal>
          </div>
        );
    }
}
