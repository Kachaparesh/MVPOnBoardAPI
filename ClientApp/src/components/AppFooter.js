import React, { Component } from 'react';

export class AppFooter extends Component {
    render() {
      return (
        <footer className="fixed-bottom mb-2 border-top bg-white">
              &copy; {new Date().getFullYear()} Copyright: Paresh Kacha
        </footer>
      );
    }
  }