console.log("I am here on git")
console.log("live-server installed");

script=["Hi There", "How are you?"]

//HTML Elements
// var isDuplicate = document.getElementById("duplicate");
var isActiveDuplicate=document.getElementById("active_duplicate")
var isBackupDuplicate=document.getElementById("backup_duplicate")
var activeDiv=document.getElementById("active_duplicate_div")
var bkpDiv=document.getElementById("backup_duplicate_div")
var using_nocatalog_notarget=document.getElementById("using_nocatalog_notarget")
var using_catalog_notarget=document.getElementById("using_catalog_notarget")
var using_target=document.getElementById("using_target")
// var which_duplicate=document.getElementById("which_duplicate")
var isCloneDB=document.getElementById("clone")
var isStandby=document.getElementById("standby")
var set_until=document.getElementById("set_until")
var bkp_location=document.getElementById("bkp_location")
var catalog=document.getElementById("catalog")
var target=document.getElementById("target")
var nofilename=document.getElementById("is_nofilename")
var setnewname=document.getElementById("is_setnewname")
var omf_stby=document.getElementById("is_omf_stby")
var error_text=document.getElementById("error_text")



//DB variables
var primary_db_name=document.getElementById("db_p_name").value //db_name
var standby_db_name=document.getElementById("db_s_name").value
var primary_db_unique_name=document.getElementById("db_pu_name").value //db_unique
var standby_db_unique_name=document.getElementById("db_su_name").value
var primary_host_name=document.getElementById("host_p_name").value //host
var standby_host_name=document.getElementById("host_s_name").value
var primary_port_number=document.getElementById("port_p_name").value //port
var standby_port_number=document.getElementById("port_s_name").value
var primary_df_path_name=document.getElementById("df_p_name").value //data file path
var standby_df_path_name=document.getElementById("df_s_name").value
var primary_lf_path_name=document.getElementById("lf_p_name").value //log file path
var standby_lf_path_name=document.getElementById("lf_s_name").value
var primary_OH_name=document.getElementById("oh_p_name").value // ORACLE_HOME
var standby_OH_name=document.getElementById("oh_s_name").value // ORACLE_HOME
var primary_version_options=document.getElementById("ver_p_name")
var standby_version_options=document.getElementById("ver_s_name")
var primary_version=primary_version_options.options[primary_version_options.selectedIndex].value
var standby_version=standby_version_options.options[standby_version_options.selectedIndex].value
var disk=document.getElementById("disk")
var tape=document.getElementById("tape")
var catalog_yes=document.getElementById("catalog_yes")
var catalog_no=document.getElementById("catalog_no")
var target_yes=document.getElementById("target_yes")
var target_no=document.getElementById("target_no")
var nofilename_yes=document.getElementById("nofilename_yes")
var nofilename_no=document.getElementById("nofilename_no")
var setnewname_yes=document.getElementById("setnewname_yes")
var setnewname_no=document.getElementById("setnewname_no")
var omf_yes=document.getElementById("omf_yes")
var omf_no=document.getElementById("omf_no")

// console.log(error_text);
//controls the visibility of bkp_based_duplicate html elements
function toggle_bkp_elements(toggle){
    set_until.style.display=toggle;
    bkp_location.style.display=toggle;
    catalog.style.display=toggle;
    target.style.display=toggle;
    nofilename.style.display=toggle;
    setnewname.style.display=toggle;
    omf_stby.style.display=toggle;
}

//Block on first run
activeDiv.style.display="none"
bkpDiv.style.display="none"
toggle_bkp_elements("none")

// which_duplicate.style.display="none"

//Check if backup based duplicate is checked and show html accordingly
isBackupDuplicate.addEventListener("click",function(){
    activeDiv.style.display="none"
    // isBackupDuplicate.checked ? which_duplicate.style.display="block": which_duplicate.style.display="none"
    if (isBackupDuplicate.checked ){
        document.getElementById("l_db_u_name").style.display="none";
        document.getElementById("l_host_name").style.display="none";
        document.getElementById("l_port_name").style.display="none";
        document.getElementById("l_OH_name").style.display="none";
        document.getElementById("l_domain_name").style.display="none";    
        toggle_bkp_elements("")
    }
})

//Check if active duplicate is checked and show html accordingly
isActiveDuplicate.addEventListener("click",function(){
    if (isActiveDuplicate.checked ){
        // document.getElementById("l_db_u_name").style.display="block";
        document.getElementById("l_db_u_name").style.display="";
        document.getElementById("l_host_name").style.display="";
        document.getElementById("l_port_name").style.display="";
        document.getElementById("l_OH_name").style.display="";
        document.getElementById("l_domain_name").style.display="";    
        toggle_bkp_elements("none")
    }
})

isStandby.addEventListener("click",function(){
    standby_db_name=primary_db_name;
})

function create_listener() {
    listener=["SID_LIST_LISTENER =\n","  (SID_LIST =\n","    (SID_DESC =\n"]
    listener.push("     (GLOBAL_DBNAME ="+  standby_db_unique_name+"\n")
    // listener.push(`\t(GLOBAL_DBNAME =  ${document.getElementById("db_su_name").value} \n<br>`)
    listener.push(`     (ORACLE_HOME = ${standby_OH_name})\n`)
    listener.push(`     (SID_NAME = ${standby_db_unique_name})`)
    listener.push(`\n    )\n  )\n`)
    listener.push("")
    listener.push(`LISTENER =\n`)
    listener.push(`  (DESCRIPTION=\n`)
    listener.push(`    (ADDRESS = (PROTOCOL=TCP) (HOST= ${standby_host_name}) (PORT=${standby_port_number}) )`)
    listener.push("\n  )")
    return listener
}

function create_tns(){
    tns=[]
    tns.push(`${standby_db_unique_name} =`)
    tns.push(`\n  (DESCRIPTION = `)
    tns.push(`\n    ((ADDRESS = (PROTOCOL = TCP)(HOST = ${standby_host_name})(PORT = ${standby_port_number})) `)
    tns.push(`\n    (CONNECT_DATA =`)
    tns.push(`\n      (SERVER = DEDICATED)`)
    tns.push(`\n      (SERVICE_NAME = ${standby_db_unique_name})`)
    tns.push(`\n    )`)
    tns.push(`\n  )`)

    tns.push(`\n\n`)
    tns.push(`${primary_db_unique_name} =`)
    tns.push(`\n  (DESCRIPTION = `)
    tns.push(`\n    ((ADDRESS = (PROTOCOL = TCP)(HOST = ${primary_host_name})(PORT = ${primary_port_number})) `)
    tns.push(`\n    (CONNECT_DATA =`)
    tns.push(`\n      (SERVER = DEDICATED)`)
    tns.push(`\n      (SERVICE_NAME = ${primary_db_unique_name})`)
    tns.push(`\n    )`)
    tns.push(`\n  )`)
    return tns
}

function create_pfile(){
    pfile_text=[]
    pfile_text.push(`Create pfile with the below parameters:\n`)
    pfile_text.push(`init${standby_db_unique_name}.ora\n`)
    pfile_text.push(`------------------------------------\n`)
    pfile_text.push(`DB_NAME=${standby_db_name}`)
    return pfile_text
}

function create_pwdfile(){
    pwd_file=[]
    pwd_file.push(`On the source database check if password file exists:\n`)
    pwd_file.push(`ls -ltr *pw*${primary_db_unique_name}*\n`)
    pwd_file.push( `If exists, copy the password file to $ORACLE_HOME/dbs on the standby and rename it to ORAPWD${standby_db_unique_name}.ora\n`)
    pwd_file.push(`If it does not exist, create a password file: orapwd FILE=$ORACLE_HOME/dbs/ORAPWD${primary_db_unique_name}.ora PASSWORD=<password>\n`)
    pwd_file.push(`copy the password file to $ORACLE_HOME/dbs on the standby and rename it to ORAPWD${standby_db_unique_name}.ora\n`)
    return pwd_file
}

function startup_nomount(){
    return `Connect to sqlplus as sysdba \n SQL> startup nomount $ORACLE_HOME/dbs/init${standby_db_unique_name}`
}

function verify_rman_connectivity(){
    return `rman target sys/<pwd>@${primary_db_unique_name} auxiliary sys/<pwd>@${standby_db_unique_name} \n if this fails, check listener and tns \n if succeeds, proceed to next step`    
}

function convert_parameters(){
        // check if path variables are arrays
    // check if they are same length
    let convert_array=[]
    if(Array.isArray(primary_df_path_name)){        
        if (!Array.isArray(standby_df_path_name)){
            standby_df_path_name=standby_df_path_name.split()
        } 
        tempArray=[]
        for(i=0;i<primary_df_path_name.length;i++){
            if(standby_df_path_name.length == primary_df_path_name.length){
                 tempArray.push(`"${primary_df_path_name[i]}","${standby_df_path_name[i]}"\n `) 
            } else {
                tempArray.push(`"${primary_df_path_name[i]}","${standby_df_path_name[0]}"\n `)
            }
                
        }
        convert_array.push(`SET DB_FILE_NAME_CONVERT ${tempArray.join(',')}`)
    }else{
        convert_array.push(`SET DB_FILE_NAME_CONVERT "${primary_df_path_name}","${standby_df_path_name}"\n `)
    }
    //LOG file name convert
    if(Array.isArray(primary_lf_path_name)){        
        if(!Array.isArray(standby_lf_path_name)){
            standby_lf_path_name=standby_lf_path_name.split()
        }
        tempArray=[]
        for(i=0;i<primary_lf_path_name.length;i++){
            if(standby_lf_path_name.length == primary_lf_path_name.length){
                tempArray.push(`"${primary_lf_path_name[i]}","${standby_lf_path_name[i]}"\n `) 
            } else{
                tempArray.push(`"${primary_lf_path_name[i]}","${standby_lf_path_name[0]}"\n `)
            }
                
        }
        convert_array.push(`SET LOG_FILE_NAME_CONVERT ${tempArray.join(',')}`)
    }else{
        convert_array.push(`SET LOG_FILE_NAME_CONVERT "${primary_lf_path_name}","${standby_lf_path_name}"\n `)
    }
    return convert_array
}
function create_duplicate_cmd(){
    duplicate_cmd=[`Create a file: rman_active_duplicate.cmd and enter the below:\n`]
    duplicate_cmd.push(`rman\n connect target sys/<pwd>@${primary_db_unique_name} \n connect auxiliary sys/<pwd>@${standby_db_unique_name} \n`)
    duplicate_cmd.push(`run { \n`)
    //check if standby or clone
    if(isStandby.checked){
        duplicate_cmd.push(`DUPLICATE TARGET DATABASE\n FOR STANDBY\n FROM ACTIVE DATABASE\n`)
    }else{
        duplicate_cmd.push(`DUPLICATE TARGET DATABASE \n TO ${standby_db_unique_name} \n FROM ACTIVE DATABASE\n`)
    }    
    //using backupset if version 12c &  above 
    // console.log(primary_version);
    // if(primary_version === "12.1.0.2" || primary_version==="12.2.0.2" || primary_version==="18.0" || primary_version==="19.0"){
    //     duplicate_cmd.push(`USING BACKUPSET <refer doc# 1987193.1 to know more about this option. You can skip this line too> \n`)
    // }
    duplicate_cmd.push(`SPFILE\n`)
    duplicate_cmd.push(convert_parameters())
    duplicate_cmd.push(`}`)
    return duplicate_cmd
}

function run_active_duplicate(){
    run_dup=[`Connect to rman\n`]
    run_dup.push(`rman target sys/<pwd>@${primary_db_unique_name} auxiliary sys/<pwd>@${standby_db_unique_name} log=/tmp/rman_active_duplicate.log\n`)
    run_dup.push(`RMAN>@rman_active_duplicate.cmd`)
    return run_dup
}

function monitor_duplicate(){
    return `Please monitor the /tmp/<duplicate>.log file to verify successfult  completion`
}

function active_duplicate(){
    //  if( isActiveDuplicate.checked && isDuplicate.checked){
        console.log("Starting instructions for active duplicate")
        activeDiv.style.display="block"
        document.getElementById("pfile").innerHTML=create_pfile().join("")
        document.getElementById("listener").innerHTML=create_listener().join("");
        document.getElementById("tns").innerHTML=create_tns().join("");
        document.getElementById("pwdfile").innerHTML=create_pwdfile().join("")
        document.getElementById("startup_nomount").innerHTML=startup_nomount()
        document.getElementById("rman_connectivity").innerHTML=verify_rman_connectivity() 
        document.getElementById("duplicate_cmd").innerHTML=create_duplicate_cmd().join("")
        document.getElementById("run_active_duplicate").innerHTML=run_active_duplicate().join("")
        document.getElementById("monitor_active_duplicate").innerHTML=monitor_duplicate()
    //  }    
}
function create_ubkploc_duplicate() {
    duplicate_cmd_ubkploc=[`Create a file: rman_duplicate.cmd and enter the below:\n`]
    duplicate_cmd_ubkploc.push(`rman auxiliary /\n`)
    duplicate_cmd_ubkploc.push(`run {\n`)
    duplicate_cmd_ubkploc.push(`DUPLICATE DATABASE TO ${standby_db_name}\n`)
    //check if set_until_time is checked
    duplicate_cmd_ubkploc.push(`SPFILE\n`)
    
    if(nofilename_yes.checked){
        duplicate_cmd_ubkploc.push(`BACKUP LOCATION '<replace this with the path where backups were copied>'\n`)
        duplicate_cmd_ubkploc.push('NOFILENAMECHECK;\n')
        duplicate_cmd_ubkploc.push(`}\n`)
        return duplicate_cmd_ubkploc;
    }
    duplicate_cmd_ubkploc.push(`SET CONTROL_FILES='<give the path where you want control files to get created>'\n`)
    duplicate_cmd_ubkploc.push(convert_parameters())
    duplicate_cmd_ubkploc.push(`BACKUP LOCATION '<replace this with the path where backups were copied>;'\n`)
    duplicate_cmd_ubkploc.push(`}\n`)    
    return duplicate_cmd_ubkploc
}
function using_backup_location(){
    console.log("using backup location starting .....");
    document.getElementById("bkp_primary_db_ubkploc").innerHTML=`RMAN> backup spfile ;\nRMAN> backup database include current controlfile plus archivelog ;\n`
    document.getElementById("move_backup_ubkploc").innerHTML=`If the duplicate is going to happen on different server, move the backup pieces to a new server using commands like ftp,scp etc.`
    document.getElementById("copy_pwd_file_ubkploc").innerHTML=create_pwdfile().join("")
    document.getElementById("create_pfile_ubkploc").innerHTML=`Create pfile only with ${standby_db_name} as parameter`
    document.getElementById("startup_nomount_ubkploc").innerHTML=`export ORACLE_SID=${standby_db_name}\nsql> startup nomount\nsql>exit`
    document.getElementById("duplicate_cmd_ubkploc").innerHTML=create_ubkploc_duplicate().join("")
    document.getElementById("run_ubkploc").innerHTML=`rman log=/tmp/rman_duplicate.log\nRMAN>@rman_duplicate.cmd\n`
    document.getElementById("monitor_ubkploc").innerHTML=monitor_duplicate()
}

function targetless_with_catalog(){
    //Working
    console.log("Coming soon - Targetless with catalog");
}

function backup_duplicate(){        
    //if target -- check tape or disk in allocate channel -- create sqlnet -- call target_based_backup
    if(target_no.checked && catalog_no.checked && tape.checked){
        console.log("You cannot use backup based duplicate")
        console.log(error_text);
        error_text.innerHTML="You cannot use backup based duplicate";
        bkpDiv.style.display="none"
    }
    //if no target no catalog//call using_bkp_location
    if(target_no.checked && catalog_no.checked && disk.checked){
        using_catalog_notarget.style.display="none"
        using_target.style.display="none"
        using_backup_location()    
    }
    //if not target but catalog -- check tape or disk in allocate channel -- call notargetwithcatalog
    if(target_no.checked && catalog_yes.checked){
        using_target.style.display="none"
        using_nocatalog_notarget.style.display="none"
        targetless_with_catalog()
    }

}
function gen_instruction(){
 primary_db_name=document.getElementById("db_p_name").value //db_name
 standby_db_name=document.getElementById("db_s_name").value
 primary_db_unique_name=document.getElementById("db_pu_name").value //db_unique
 standby_db_unique_name=document.getElementById("db_su_name").value
 primary_host_name=document.getElementById("host_p_name").value //host
 standby_host_name=document.getElementById("host_s_name").value
 primary_port_number=document.getElementById("port_p_name").value //port
 standby_port_number=document.getElementById("port_s_name").value
 primary_df_path_name=document.getElementById("df_p_name").value
 standby_df_path_name=document.getElementById("df_s_name").value
 primary_lf_path_name=document.getElementById("lf_p_name").value 
 standby_lf_path_name=document.getElementById("lf_s_name").value
 primary_version=primary_version_options.options[primary_version_options.selectedIndex].value
 standby_version=standby_version_options.options[standby_version_options.selectedIndex].value
//  console.log(primary_version);
//  isCloneDB=document.getElementById("clone")
//  isStandby=document.getElementById("standby")
//  //check if path has commas and split into array
primary_df_path_name.includes(',')?  primary_df_path_name = primary_df_path_name.split(',') : primary_df_path_name=document.getElementById("df_p_name").value; //data file path
standby_df_path_name.includes(',')? standby_df_path_name=standby_df_path_name.split(',') :standby_df_path_name=document.getElementById("df_s_name").value
primary_lf_path_name.includes(',') ? primary_lf_path_name=primary_lf_path_name.split(','):  primary_lf_path_name=document.getElementById("lf_p_name").value //log file path
standby_lf_path_name.includes(',') ? standby_lf_path_name=standby_lf_path_name.split(','):standby_lf_path_name=document.getElementById("lf_s_name").value
//  primary_OH_name=document.getElementById("oh_p_name").value // ORACLE_HOME
//  standby_OH_name=document.getElementById("oh_s_name").value // ORACLE_HOME

//  disk=document.getElementById("disk")
//  tape=document.getElementById("tape")
//  catalog_yes=document.getElementById("catalog_yes")
//  catalog_no=document.getElementById("catalog_no")
//  target_yes=document.getElementById("target_yes")
//  target_no=document.getElementById("target_no")
//  nofilename_yes=document.getElementById("nofilename_yes")
//  nofilename_no=document.getElementById("nofilename_no")
//  setnewname_yes=document.getElementById("setnewname_yes")
//  setnewname_no=document.getElementById("setnewname_no")
//  omf_yes=document.getElementById("omf_yes")
//  omf_no=document.getElementById("omf_no")

if(isActiveDuplicate.checked){
    active_duplicate()   
}
    

if (isBackupDuplicate.checked){
    // primary_db_unique_name.style.display="none";
    // standby_db_unique_name.style.display="none";
    // primary_host_name.style.display="none";
    // standby_host_name.style.display="none";
    // primary_port_number.style.display="none";
    // standby_port_number.style.display="none";
    // primary_OH_name.style.display="none";
    // standby_OH_name.style.display="none";
    activeDiv.style.display="none"
    bkpDiv.style.display=""
    //backup duplicate
    backup_duplicate()
}

}

//Create listener
//create tns
//create pwd_file
//create duplicate_cmd

