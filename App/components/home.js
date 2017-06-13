/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {

  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import Nav from './global-widgets/nav'
import SwipeCards from 'react-native-swipe-cards';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconz from 'react-native-vector-icons/Ionicons';
import CardModal from './card-modal';


var image1 = require('../images/rajneesh.jpg')
var image2 = require('../images/abhay.jpg')
var image3 = require('../images/ankit.jpg')
var image4 = require('../images/gaurav.jpg')

// var image1 = require('../images/image1.jpeg')
// var image2 = require('../images/image2.jpeg')
// var image3 = require('../images/image3.jpeg')

const Cards = [{
  "id": 1,
  "key": 1,
  "first_name": "Rajneesh Aggarwal",
  "age": 36,
  "image": image1,
  "expand": false,
  "desc": 'Male',
  "short_desc": "Senior Architect in Nagarro Softwares.",
  "content": 'Currently leading the mobility practice technically at Nagarro, with 12+ years of experience in architecture and designing global enterprise and mobile solutions. Full stack technical architect with hands-on knowledge. '
}, {
  "id": 2,
  "key": 2,
  "first_name": "Abhay Anand",
  "age": 36,
  "image": image2,
  "desc": 'Male',
  "short_desc": "Senior Architect in Nagarro Softwares.",
  "content": 'Graduated from IIT-BHU with extensive experience in Software Services Sales, Delivery and Project Management for various enterprise web, desktop and mobile systems. Expertise in Enterprise/Consumer mobile and web/desktop applications.'
}, {
  "id": 3,
  "key": 3,
  "first_name": "Ankit Tyagi",
  "age": 28,
  "image": image3,
  "desc": 'Male',
  "short_desc": "Senior Associate in Nagarro Softwares.",
  "content": 'Graduate from BIT, Mesra with experience in hybrid and crossplatform Mobile applications. Also have working experience in backend technologies like Ruby on Rails and PHP.'
},{
  "id": 4,
  "key": 4,
  "first_name": "Gaurav",
  "age": 22,
  "image": image4,
  "desc": 'Male',
  "short_desc": "Junior Associate in Nagarro Softwares.",
  "content": 'Graduate from IP University,  Have experience in hybrid crossplatform Mobile applications. Also have working experience in backend technology like .NET.'
}]

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      cards: Cards,
      expand: false
    }
  }
  cardClicked(card){
    console.log("Card" + card.id + "clicked");
  }
  Card(card){
    return (

      <View style={styles.card}>
        <CardModal title={card.first_name}
                   ref = {'cardModal'}
                   description={card.desc}
                   shortDescription={card.short_desc}
                   age={card.age}
                   image={card.image}
                   color={'#0E48BE'}
                   content={card.content}
                   onClick={()=> this.cardClicked(card)}
                   due={3}

        />
      </View>

    )
  }
  handleYup (card) {
    console.log(`Yup for ${card.text}`)
  }

  handleNope (card) {
    console.log(`Nope for ${card.text}`)
  }
  noMore(){
    return (
      <View style={styles.card} >
        <Text>Thank You !</Text>
      </View>
    )
  }

  yup(){
    this.refs['swiper']._goToNextCard()
  }

  nope(){
    this.refs['swiper']._goToPrevCard()
  }

  render() {
    return (
      <View style={styles.container}>
          <Nav chat = {() => this.props.navigator.replace({id: "messages"})} toProfile = {() => this.props.navigator.replace({id:'profile'})} />
          <SwipeCards
            panHandlers={null}
            ref = {'swiper'}
            loop = {false}
            renderNoMoreCards = {() => this.noMore()}
            cards={this.state.cards}
            containerStyle = {{  backgroundColor: '#f7f7f7', alignItems:'center', margin:20}}
            renderCard={(cardData) => this.Card(cardData)}
            showYup={false}
            showNope={false}
            stack = {true}
            stackOffsetX = {0}
            stackOffsetY = {15}
            smoothTransition = {true}
            handleYup={this.handleYup}
            handleNope={this.handleNope}
          />
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center',zIndex: -1}}>
            <TouchableOpacity style = {styles.buttons} onPress = {() => this.nope()}>
            <Iconz name='ios-arrow-dropleft-outline' size={45} color="#888" style={{}} />
            </TouchableOpacity>
            <TouchableOpacity style = {styles.buttons} onPress = {() => this.yup()}>
            <Iconz name='ios-arrow-dropright' size={45} color="#888" style={{}} />
            </TouchableOpacity>
          </View>
        </View>
    )
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f7f7f7',
  },
  buttons:{
    width:80,
    height:80,
    justifyContent:'center',
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems:'center',
    padding: 2
  },
  buttonSmall:{
    width:50,
    height:50,
    borderWidth:2,
    borderColor:'#e7e7e7',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25
  },
   card: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    borderColor:'#e3e3e3',
  }

});
