<template>

<div class="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">

     
    <div class="kt-container ">
 
        <div class="kt-portlet kt-portlet--tabs kt-portlet--height-fluid">
            <div class="kt-portlet__head">
                <div class="kt-portlet__head-label">
                    <h3 class="kt-portlet__head-title">
                        Rules
                    </h3>
                </div>
                 <div class="kt-portlet__head-toolbar">
                 <div class="d-flex align-items-center">

                  <!--    <router-link :to="{ name: 'automation.accounts', query:{channel:'fb',default:false}}" class="btn btn-sm btn-label-brand btn-bold mr-2">
                        Select FB Account
                    </router-link>

                     <router-link :to="{ name: 'automation.adaccounts', query:{channel:channel,acid:acid,adaccount:adaccount,account_id:acid,default:false}}" class="btn btn-sm btn-label-brand btn-bold mr-2">
                        Select Ad Account
                    </router-link> -->

                     <router-link :to="{ name: 'automation.rule_setting', query:{channel:channel,acid:acid,adaccount:adaccount}}" class="btn btn-sm btn-label-brand btn-bold mr-2">
                        Create Rule
                    </router-link>
                    
                    <router-link :to="{ name: 'automation.ad_compaigns', query:{channel:channel,acid:acid,adaccount:adaccount,account_id:acid}}" class="btn btn-sm btn-label-brand btn-bold mr-2">
                        Campaigns
                    </router-link>
                    
                 </div>
             </div>
            </div>
            <div class="kt-portlet__body">
                <loading :active.sync="isLoading" 
                :can-cancel="false" 
           
                :is-full-page="false"></loading>
                <table class="table table-head-bg-brand">
                    <thead class="thead-inverse">
                        <tr>
                            <th></th>
                            <!-- <th>Actions</th> -->
                            <th>Active</th>
                            <th>Name</th>
                            <th>Adset State</th>
                            <th>Ad State</th>
                            <th>Source</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody  v-if="rules.length > 0">
                      
                        <tr v-for="(ac,i) in rules" :key="'id_'+i">
                           
                            <td>
                              <!--  <label class="kt-radio">
                                  <input type="radio"  :value="ac.id">
                                  <span></span>
                              </label> -->
                           </td>

                      <!--      <td>
                              <div class="dropdown">
                                <a  type="text" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  <i class="fa fa-cog"></i>
                                </a>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                  <router-link :to="{ name: 'automation.rule_setting', query:{channel:channel,acid:acid,adaccount:adaccount,edit:ac.id}}" class="dropdown-item" href="#">Edit</router-link>
                                </div>
                              </div>
                           </td>
 -->
                           <td>
                            <span class="kt-switch--sm kt-switch">
                              <label>
                              <input @change="updateStatus(ac.id,ac.status,adaccount,i)" type="checkbox" :checked="getStatus(ac.status)" value="1">
                              <span></span>
                              </label>
                              </span>
                            </td>

                            <td>
                                {{ ac.name }}
                            </td>

                            <td>
                                
                            <span class="kt-switch--sm kt-switch">
                              <label>
                              <input @change="updateAdsetStatus(ac.id,ac.adset_status,adaccount,i)" type="checkbox" :checked="getStatus(ac.adset_status)" :name="'adsetStatus_'+ac.id" value="1">
                              <span></span>
                              </label>
                              </span>
                            </td>

                            <td>
                                  <span class="kt-switch--sm kt-switch">
                                  <label>
                                  <input @change="updateAdStatus(ac.id,ac.ad_status,adaccount,i)" type="checkbox" :checked="getStatus(ac.ad_status)" value="1">
                                  <span></span>
                                  </label>
                                  </span>
                            </td>

                            <td>
                                {{ ac.datasource }}
                            </td>
                            <td>
                                {{ ac.startDateTime }}
                            </td>
                            <td>
                                 {{ ac.endDateTime }}
                            </td>
                              <td>
                                <a href="#" class="btn btn-clean btn-sm btn-icon btn-icon-md" data-toggle="dropdown">
                                      <i class="flaticon-more-1"></i>
                                  </a>
                                  <div class="dropdown-menu dropdown-menu-fit dropdown-menu-right">
                                      <ul class="kt-nav">
                                          <li class="kt-nav__item">
                                                <router-link :to="{ name: 'automation.rule_setting', query:{channel:channel,acid:acid,adaccount:adaccount,edit:ac.id}}" class="kt-nav__link">
                                                 <i class="kt-nav__link-icon flaticon2-settings"></i>
                                                  <span class="kt-nav__link-text">Edit</span>
                                              </router-link>
                                          </li>

                                          <!-- <li class="kt-nav__item">
                                              <a href="#" class="kt-nav__link">
                                                  <i class="kt-nav__link-icon flaticon2-delete"></i>
                                                  <span class="kt-nav__link-text">Remove</span>
                                              </a>
                                          </li> -->

                                      </ul>
                                  </div>
                              </td>
                        </tr>
                          <!--   <td>
                                <router-link :to="{ name: 'automation.adsets', params:{ campaign:ac.id }, query:{channel:channel,acid:acid,adaccount:adaccount}}" tag="a" class="btn btn-sm btn-label-brand btn-bold">
                                    Select
                                </router-link>
                            </td> -->
                      
                        
                    </tbody>
                    <tbody v-else>
                       <tr >
                          <td colspan="9" class="text-center">Whooops, looks like you don’t have any rules, lets create some   
                                 <router-link :to="{ name: 'automation.rule_setting', query:{channel:channel,acid:acid,adaccount:adaccount}}">
                                  Create a new
                              </router-link>
                          </td>
                        </tr>
                    </tbody>
                </table>

                <div class="pagination text-center">
                    <button  :disabled="!before" @click="previous" type="button" class="btn btn-info mr-2">Previous</button>
                    <button  :disabled="!after" @click="next" type="button" class="btn btn-info">Next</button>
                </div>
                
            </div>
            

        </div>

    </div>


             
</div>
</template>

<script>
    // import CampaignCreateModal from '@/FrontApp/Views/Campaign/createModal';
    export default{

    props:{
      currency:{
                type:String,
                 
            },
    },
        name:"RulesIndex",
        data(){
            return {

                campaign_modal:false,
                        rules:[],
                channel:"",
                acid:"",
                adaccount:"",
                account_id:"",
                isLoading:false,

                // Paging
                after:"",
                before:"",
             
                // Paging
            }
        },
        methods:{
            
            campaignCBO(bid_strategy){
              if(bid_strategy){
                return 'Yes';
              }else{
                return '--';
              }
            },

            previous(){
                
                this.fetch(this.channel,this.acid,this.adaccount,this.before,false);
            },
            next(){
                
                this.fetch(this.channel,this.acid,this.adaccount,false,this.after);
               
            },
          
            updateAdsetStatus(ruleId,status,adaccount,i){
                  
                    if(status == "1"){
                        this.rules[i].adset_status = 0;
                        status = false;
                    }else{
                        this.rules[i].adset_status = 1;
                        status = true;
                    }
                    axios.post('/api/fb/rules/'+ruleId+'/adset-status/'+status+'/'+adaccount)
                      .then((response) => {
                        
                      })
                      .catch(function (error) {
                       
                      }).finally( () => {
                        this.isLoading = false;
                      });

            },

             updateAdStatus(ruleId,status,adaccount,i){
                  
                    if(status == "1"){
                        this.rules[i].ad_status = 0;
                        status = false;
                    }else{
                        this.rules[i].ad_status = 1;
                        status = true;
                    }
                    axios.post('/api/fb/rules/'+ruleId+'/ad-status/'+status+'/'+adaccount)
                      .then((response) => {
                        
                      })
                      .catch(function (error) {
                       
                      }).finally( () => {
                        this.isLoading = false;
                      });

            },

             updateStatus(ruleId,status,adaccount,i){
              
                    if(status == true){
                        this.rules[i].status = false;
                        status = false;
                    }else{
                        this.rules[i].status = true;
                        status = true;
                    }
                    axios.post('/api/fb/rules/'+ruleId+'/status/'+status+'/'+adaccount)
                      .then((response) => {
                        
                      })
                      .catch(function (error) {
                       
                      }).finally( () => {
                        this.isLoading = false;
                      });

            },
          
 

            fetch(channel,acid,adaccount,before = false,after = false){
                
                this.isLoading = true;
                var params = [
                     `channel=${channel}`,
                     `acid=${acid}`,
                     `adaccount=${adaccount}`,
                  ];
                if(before){
                    params.push(`before=${before}`);
                }
                if(after){
                    params.push(`after=${after}`);
                }

              params = params.join('&');

              axios.get('/api/fb/rules/'+adaccount+'?'+params)
                      .then((response) => {

                         this.rules = response.data.data;
                         // this.before = response.data.data.before;
                         // this.after = response.data.data.after;
                          
                      })
                      .catch(function (error) {
                       
                      }).finally( () => {
                        this.isLoading = false;
                      });

            }
        },
        created(){
            if((this.channel = this.$route.query.channel) && (this.acid = this.$route.query.acid) && (this.adaccount = this.$route.query.adaccount) ){
                this.fetch(this.channel,this.acid,this.adaccount);
            }
                
            if(this.currency){
              this.$store.commit("SET_CURRENCY",this.currency);
            }    
        }
    }

</script>