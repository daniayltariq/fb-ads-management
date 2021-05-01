<template>
  
     <router-view v-if="show"/>

</template>

<script>


export default {
  name: 'App',

  data(){
  	return {

  		show:false

  	}
  },


  methods:{

  	getSetting(){

  		axios.get('/api/setting/default/fb')
				  .then((response) => {
				  
				  	this.$store.commit("SET_DEFAULT_SETTING",response.data);
				 	this.show = true;
				  })
				  .catch(function (error) {
				   
				  }).finally( () => {
                     
                  });

  	}

  },

  created(){

  	this.getSetting();
    
  }
}



</script>