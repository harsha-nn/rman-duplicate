console.log("I am here on git");
console.log("live-server installed");

script = ["Hi There", "How are you?"];

//HTML Elements
// var isDuplicate = document.getElementById("duplicate");
var isActiveDuplicate = document.getElementById("active_duplicate");
var isBackupDuplicate = document.getElementById("backup_duplicate");
var activeDiv = document.getElementById("active_duplicate_div");
var bkpDiv = document.getElementById("backup_duplicate_div");
var activestbydiv = document.getElementById("active_duplicate_standby_div");
var using_nocatalog_notarget = document.getElementById(
  "using_nocatalog_notarget"
);
var using_catalog_notarget = document.getElementById("using_catalog_notarget");
var using_target = document.getElementById("using_target");
// var which_duplicate=document.getElementById("which_duplicate")
var isCloneDB = document.getElementById("clone");
var isStandby = document.getElementById("standby");
var set_until = document.getElementById("set_until");
var bkp_location = document.getElementById("bkp_location");
var catalog = document.getElementById("catalog");
var target = document.getElementById("target");
var nofilename = document.getElementById("is_nofilename");
var setnewname = document.getElementById("is_setnewname");
var omf_stby = document.getElementById("is_omf_stby");
var error_text = document.getElementById("error_text");
var create_standby_using_bkp = document.getElementById(
  "create_standby_using_bkp"
);

//DB variables
var primary_db_name = document.getElementById("db_p_name").value; //db_name
var standby_db_name = document.getElementById("db_s_name").value;
var primary_db_unique_name = document.getElementById("db_pu_name").value; //db_unique
var standby_db_unique_name = document.getElementById("db_su_name").value;
var primary_host_name = document.getElementById("host_p_name").value; //host
var standby_host_name = document.getElementById("host_s_name").value;
var primary_port_number = document.getElementById("port_p_name").value; //port
var standby_port_number = document.getElementById("port_s_name").value;
var primary_df_path_name = document.getElementById("df_p_name").value; //data file path
var standby_df_path_name = document.getElementById("df_s_name").value;
var primary_lf_path_name = document.getElementById("lf_p_name").value; //log file path
var standby_lf_path_name = document.getElementById("lf_s_name").value;
var standby_cf_path_name = document.getElementById("cf_s_name").value;
var primary_OH_name = document.getElementById("oh_p_name").value; // ORACLE_HOME
var standby_OH_name = document.getElementById("oh_s_name").value; // ORACLE_HOME
var primary_version_options = document.getElementById("ver_p_name");
var standby_version_options = document.getElementById("ver_s_name");
// var primary_version=primary_version_options.options[primary_version_options.selectedIndex].value
// var standby_version=standby_version_options.options[standby_version_options.selectedIndex].value
var disk = document.getElementById("disk");
var tape = document.getElementById("tape");
var catalog_yes = document.getElementById("catalog_yes");
var catalog_no = document.getElementById("catalog_no");
var target_yes = document.getElementById("target_yes");
var target_no = document.getElementById("target_no");
var nofilename_yes = document.getElementById("nofilename_yes");
var nofilename_no = document.getElementById("nofilename_no");
var setnewname_yes = document.getElementById("setnewname_yes");
var setnewname_no = document.getElementById("setnewname_no");
var omf_yes = document.getElementById("omf_yes");
var omf_no = document.getElementById("omf_no");
var no_set_until = document.getElementById("no_set_until");
var set_until_time = document.getElementById("set_until_time");
var set_until_scn = document.getElementById("set_until_scn");
var set_until_logseq = document.getElementById("set_until_logseq");
var until_time = document.getElementById("until_time").value;
var until_scn = document.getElementById("until_scn").value;
var until_log = document.getElementById("until_log").value;
//setting this to ensure initial selection works
document.getElementById("db_s_name").value = `boston`;

// console.log(error_text);
//controls the visibility of bkp_based_duplicate html elements
function toggle_bkp_elements(toggle) {
  set_until.style.display = toggle;
  bkp_location.style.display = toggle;
  catalog.style.display = toggle;
  target.style.display = toggle;
  nofilename.style.display = toggle;
  setnewname.style.display = toggle;
  // omf_stby.style.display=toggle;
  document.getElementById("is_setnewname").style.display = "none";
  //
}

function toggle_active_elements(toggle) {
  document.getElementById("l_db_u_name").style.display = toggle;
  document.getElementById("l_host_name").style.display = toggle;
  document.getElementById("l_port_name").style.display = toggle;
  document.getElementById("l_OH_name").style.display = toggle;
  document.getElementById("l_domain_name").style.display = toggle;
  // omf_stby.style.display=toggle;
}

//Block on first run
activeDiv.style.display = "none";
bkpDiv.style.display = "none";
activestbydiv.style.display = "none";
toggle_bkp_elements("none");
error_text.style.display = "none";

//Check if backup based duplicate is checked and show html accordingly
isBackupDuplicate.addEventListener("click", function () {
  activeDiv.style.display = "none";
  document.getElementById("db_s_name").value = `boston`;
  // isBackupDuplicate.checked ? which_duplicate.style.display="block": which_duplicate.style.display="none"
  if (isBackupDuplicate.checked) {
    toggle_active_elements("none");
    toggle_bkp_elements("");
    document.getElementById("is_omf_stby").style.display = "none";
  }
});

//Check if active duplicate is checked and show html accordingly
isActiveDuplicate.addEventListener("click", function () {
  if (isActiveDuplicate.checked) {
    // document.getElementById("l_db_u_name").style.display="block";
    if (isStandby.checked) {
      document.getElementById("db_s_name").value = `chicago`;
    } else {
      document.getElementById("db_s_name").value = `boston`;
    }
    document.getElementById("l_db_u_name").style.display = "";
    document.getElementById("l_host_name").style.display = "";
    document.getElementById("l_port_name").style.display = "";
    document.getElementById("l_OH_name").style.display = "";
    document.getElementById("l_domain_name").style.display = "";
    omf_stby.style.display = "";
    toggle_bkp_elements("none");
  }
});
//Check if target is selected and show tns html
function isTargetEnabled(radio) {
  if (radio.value == "target") {
    toggle_active_elements("");
  } else {
    toggle_active_elements("none");
  }
}

//Change standby db name to match primary if standby is selected
function change_db_name(radio) {
  if (radio.value == "Active") {
    document.getElementById("db_s_name").value = `chicago`;
    if (isBackupDuplicate.checked) {
      toggle_active_elements("");
      target_yes.checked = true;
    }
  } else {
    document.getElementById("db_s_name").value = `boston`;
    if (isBackupDuplicate.checked) {
      toggle_active_elements("none");
    }
  }
}

//if nofilename is selected hide the next two questions
function nofilenamecheck(radio) {
  if (radio.value == "nofilenamecheck_no") {
    console.log("in no file name check");
    document.getElementById("is_setnewname").style.display = "";
    document.getElementById("is_omf_stby").style.display = "";
  } else {
    document.getElementById("is_setnewname").style.display = "none";
    document.getElementById("is_omf_stby").style.display = "none";
  }
}

isStandby.addEventListener("click", function () {
  standby_db_name = primary_db_name;
});

function create_listener() {
  listener = ["SID_LIST_LISTENER =\n", "  (SID_LIST =\n", "    (SID_DESC =\n"];
  if (isStandby.checked) {
    listener.push(`     (GLOBAL_DBNAME =${standby_db_unique_name}_DGMGRL)\n`);
  } else {
    listener.push(`     (GLOBAL_DBNAME =${standby_db_unique_name})\n`);
  }

  // listener.push(`\t(GLOBAL_DBNAME =  ${document.getElementById("db_su_name").value} \n<br>`)
  listener.push(`     (ORACLE_HOME = ${standby_OH_name})\n`);
  listener.push(`     (SID_NAME = ${standby_db_unique_name})`);
  listener.push(`\n    )\n  )\n`);
  listener.push("");
  listener.push(`LISTENER =\n`);
  listener.push(`  (DESCRIPTION=\n`);
  listener.push(
    `    (ADDRESS = (PROTOCOL=TCP) (HOST= ${standby_host_name}) (PORT=${standby_port_number}) )`
  );
  listener.push("\n  )");
  return listener;
}

function create_tns() {
  tns = [];
  tns.push(`${standby_db_unique_name} =`);
  tns.push(`\n  (DESCRIPTION = `);
  tns.push(`\n    (ADDRESS_LIST=`);
  tns.push(
    `\n        (ADDRESS = (PROTOCOL = TCP)(HOST = ${standby_host_name})(PORT = ${standby_port_number})) `
  );
  tns.push(`\n    )`);
  tns.push(`\n    (CONNECT_DATA =`);
  tns.push(`\n      (SERVER = DEDICATED)`);
  // tns.push(`\n      (SERVICE_NAME = ${standby_db_unique_name})`)
  tns.push(`\n      (SID = ${standby_db_unique_name})`);
  tns.push(`\n    )`);
  tns.push(`\n  )`);

  tns.push(`\n\n`);
  tns.push(`${primary_db_unique_name} =`);
  tns.push(`\n  (DESCRIPTION = `);
  tns.push(`\n    (ADDRESS_LIST=`);
  tns.push(
    `\n         (ADDRESS = (PROTOCOL = TCP)(HOST = ${primary_host_name})(PORT = ${primary_port_number})) `
  );
  tns.push(`\n     )`);
  tns.push(`\n    (CONNECT_DATA =`);
  tns.push(`\n      (SERVER = DEDICATED)`);
  // tns.push(`\n      (SERVICE_NAME = ${primary_db_unique_name})`)
  tns.push(`\n      (SID = ${primary_db_unique_name})`);
  tns.push(`\n    )`);
  tns.push(`\n  )`);
  return tns;
}

function create_pfile() {
  pfile_text = [];
  if (standby_db_unique_name === standby_db_name) {
    pfile_text.push(`Create pfile with the below parameters:\n`);
    pfile_text.push(`init${standby_db_unique_name}.ora\n`);
    pfile_text.push(`------------------------------------\n`);
    pfile_text.push(`DB_NAME=${standby_db_name}`);
  } else {
    pfile_text.push(`Create pfile with the below parameters:\n`);
    pfile_text.push(`init${standby_db_unique_name}.ora\n`);
    pfile_text.push(`------------------------------------\n`);
    pfile_text.push(`DB_NAME=${standby_db_name}\n`);
    pfile_text.push(`DB_UNIQUE_NAME=${standby_db_unique_name}`);
  }
  if (isActiveDuplicate.checked) {
    pfile_text.push(
      `\nif your source database is multitenant add the below parameter: \nenable_pluggable_database=true\n`
    );
  }
  return pfile_text;
}
function create_omf_pfile() {
  pfile_text = [];
  pfile_text.push(`Create pfile with the below parameters:\n`);
  pfile_text.push(`init${standby_db_unique_name}.ora\n`);
  pfile_text.push(`------------------------------------\n`);
  pfile_text.push(`DB_NAME=${standby_db_name}\n`);
  pfile_text.push(`db_create_file_dest=${standby_df_path_name}\n`);
  pfile_text.push(`DB_CREATE_ONLINE_LOG_DEST=${standby_lf_path_name}`);
  if (isActiveDuplicate.checked) {
    pfile_text.push(
      `if your standby is multitenant add the below parameter \nenable_pluggable_database=true\n`
    );
  }
  return pfile_text;
}
function create_pwdfile() {
  pwd_file = [];
  pwd_file.push(`On the source database check if password file exists:\n`);
  pwd_file.push(`ls -ltr $ORACLE_HOME/dbs/*pw*${primary_db_unique_name}*\n`);
  if (standby_db_name === standby_db_unique_name) {
    pwd_file.push(
      `If exists, copy the password file to $ORACLE_HOME/dbs on the standby and rename it to ORAPWD${standby_db_unique_name}.ora\n`
    );
    pwd_file.push(
      `If it does not exist, create a password file: orapwd FILE=$ORACLE_HOME/dbs/ORAPWD${primary_db_unique_name}.ora PASSWORD=<password>\n`
    );
    pwd_file.push(
      `copy the password file to $ORACLE_HOME/dbs on the standby and rename it to ORAPWD${standby_db_unique_name}.ora\n`
    );
  } else {
    pwd_file.push(
      `If exists, copy the password file to $ORACLE_HOME/dbs on the standby and rename it to ORAPWD${standby_db_name}.ora\n`
    );
    pwd_file.push(
      `If it does not exist, create a password file: orapwd FILE=$ORACLE_HOME/dbs/ORAPWD${primary_db_name}.ora PASSWORD=<password>\n`
    );
    pwd_file.push(
      `copy the password file to $ORACLE_HOME/dbs on the destination database and rename it to ORAPWD${standby_db_name}.ora\n`
    );
  }

  return pwd_file;
}

function startup_nomount() {
  return `export ORACLE_SID=${standby_db_unique_name}\nConnect to sqlplus as sysdba \n SQL> startup nomount pfile=$ORACLE_HOME/dbs/init${standby_db_unique_name}.ora`;
}

function verify_rman_connectivity() {
  return `rman target sys/<pwd>@${primary_db_unique_name} auxiliary sys/<pwd>@${standby_db_unique_name} \n if this fails, check listener and tns \n if succeeds, proceed to next step`;
}

function convert_parameters() {
  // check if path variables are arrays
  // check if they are same length
  console.log("Running convert");
  let convert_array = [];
  if (Array.isArray(standby_df_path_name)) {
    if (!Array.isArray(standby_df_path_name)) {
      standby_df_path_name = standby_df_path_name.split();
    }
    tempArray = [];
    for (i = 0; i < primary_df_path_name.length; i++) {
      if (standby_df_path_name.length == primary_df_path_name.length) {
        tempArray.push(
          `"${primary_df_path_name[i]}","${standby_df_path_name[i]}"\n `
        );
      } else {
        tempArray.push(
          `"${primary_df_path_name[i]}","${standby_df_path_name[0]}"\n `
        );
      }
    }
    convert_array.push(`SET DB_FILE_NAME_CONVERT ${tempArray.join(",")}`);
  } else {
    convert_array.push(
      `SET DB_FILE_NAME_CONVERT "${primary_df_path_name}","${standby_df_path_name}"\n `
    );
  }
  //LOG file name convert
  if (Array.isArray(primary_lf_path_name)) {
    if (!Array.isArray(standby_lf_path_name)) {
      standby_lf_path_name = standby_lf_path_name.split();
    }
    tempArray = [];
    for (i = 0; i < primary_lf_path_name.length; i++) {
      if (standby_lf_path_name.length == primary_lf_path_name.length) {
        tempArray.push(
          `"${primary_lf_path_name[i]}","${standby_lf_path_name[i]}"\n `
        );
      } else {
        tempArray.push(
          `"${primary_lf_path_name[i]}","${standby_lf_path_name[0]}"\n `
        );
      }
    }
    convert_array.push(`SET LOG_FILE_NAME_CONVERT ${tempArray.join(",")}`);
  } else {
    convert_array.push(
      `SET LOG_FILE_NAME_CONVERT "${primary_lf_path_name}","${standby_lf_path_name}"\n `
    );
  }
  return convert_array;
}

function get_controlfile() {
  console.log("Getting control file");
  let control_array = [];
  if (Array.isArray(standby_cf_path_name)) {
    // standby_cf_path_name=standby_cf_path_name.split()
    console.log(standby_cf_path_name);
    // tempArray=[]
    // for(i=0;i<standby_cf_path_name.length;i++){
    //         tempArray.push(`"${standby_cf_path_name[i]}"\n `)
    //         console.log(tempArray[i])
    // }
    control_array.push(
      `SET CONTROL_FILES='${standby_cf_path_name.join("','")}'\n`
    );
  } else {
    control_array.push(`SET CONTROL_FILES='${standby_cf_path_name}'\n `);
  }
  return control_array;
}
function create_duplicate_cmd() {
  duplicate_cmd = [
    `Create a file: rman_active_duplicate.cmd and enter the below:\n`,
  ];
  duplicate_cmd.push(
    `connect target sys/<pwd>@${primary_db_unique_name} \n connect auxiliary sys/<pwd>@${standby_db_unique_name} \n`
  );
  duplicate_cmd.push(`set echo on;\n`);
  duplicate_cmd.push(`run { \n`);
  //check if standby or clone
  if (isStandby.checked) {
    duplicate_cmd.push(
      `DUPLICATE TARGET DATABASE\n FOR STANDBY\n FROM ACTIVE DATABASE\n`
    );
  } else {
    duplicate_cmd.push(
      `DUPLICATE TARGET DATABASE \n TO ${standby_db_unique_name} \n FROM ACTIVE DATABASE\n`
    );
  }
  //using backupset if version 12c &  above
  // console.log(primary_version);
  // if(primary_version === "12.1.0.2" || primary_version==="12.2.0.2" || primary_version==="18.0" || primary_version==="19.0"){
  //     duplicate_cmd.push(`USING BACKUPSET <refer doc# 1987193.1 to know more about this option. You can skip this line too> \n`)
  // }

  if (omf_no.checked) {
    duplicate_cmd.push(`SPFILE\n`);
    duplicate_cmd.push(get_controlfile());
    duplicate_cmd.push(convert_parameters());
  }
  duplicate_cmd.push(`}`);
  return duplicate_cmd;
}

function run_active_duplicate() {
  run_dup = [`Connect to rman\n`];
  run_dup.push(
    // `rman target sys/<pwd>@${primary_db_unique_name} auxiliary sys/<pwd>@${standby_db_unique_name} log=/tmp/rman_active_duplicate.log\n`
    `rman log=/tmp/rman_active_duplicate.log\n`
  );
  run_dup.push(`RMAN>@rman_active_duplicate.cmd`);
  return run_dup;
}

function monitor_duplicate() {
  return `Please monitor the /tmp/<duplicate>.log file to verify successful  completion. 
        If you receive any errors, please follow the doc# 1671431.1 and create an SR with the output`;
}
function verify_backup() {
  return `Make sure you have full backups along with archive logs 
    Please run RMAN> restore preview; to get a list of backups that would be used.
    If not take a backup of spfile and full backup along with archive logs:
    RMAN> backup spfile;
    RMAN> backup database plus archivelog;`;
}
function active_duplicate() {
  //  if( isActiveDuplicate.checked && isDuplicate.checked){
  console.log("Starting instructions for active duplicate");
  activestbydiv.style.display = "none";
  activeDiv.style.display = "block";
  if (omf_yes.checked) {
    document.getElementById("pfile").value = create_omf_pfile().join("");
  } else {
    document.getElementById("pfile").value = create_pfile().join("");
  }
  document.getElementById("listener").value = create_listener().join("");
  document.getElementById("tns").value = create_tns().join("");
  document.getElementById("pwdfile").value = create_pwdfile().join("");
  document.getElementById("startup_nomount").value = startup_nomount();
  document.getElementById("rman_connectivity").value =
    verify_rman_connectivity();
  document.getElementById("duplicate_cmd").value =
    create_duplicate_cmd().join("");
  document.getElementById("run_active_duplicate").value =
    run_active_duplicate().join("");
  document.getElementById("monitor_active_duplicate").value =
    monitor_duplicate();
  bkpDiv.style.display = "none";
  // using_nocatalog_notarget.style.display="none"
  // using_catalog_notarget.style.display="none"
  // error_text.style.display="none"
  // create_standby_using_bkp_func.style.display="none"
  //  }
}
function add_srl() {
  let add_srl = [];
  add_srl.push(
    `Standby redo logs should be of the same size as that of primary online redo logs.\n`
  );
  add_srl.push(
    `For eg: If primary has 2 groups in thread 1, standby should have 3 groups in corresponding thread 1\n`
  );
  add_srl.push(
    `Refer note: Handling ORL and SRL (Resize) on Primary and Physical Standby in Data Guard Environment (Doc ID 1532566.1)`
  );
  return add_srl;
}
function configure_broker() {
  return `Follow the below note and create dataguard broker configuration:
    12c Create Dataguard Broker Configuration - DGMGRL (Doc ID 1583588.1) `;
}
function verify_dg_config() {
  return `Run the following queries to verify primary is shipping logs and standby is applying them:
    ON PRIMARY DATABASE:
-----------------------------------
SQL> alter system switch logfile; //execute a couple of times
 SQL> select thread#, max(sequence#) "Last Primary Seq Generated" from gv$archived_log val, v$database vdb where val.resetlogs_change# = vdb.resetlogs_change# group by thread# order by 1;

SQL>SELECT thread#, dest_id, gvad.status, error, fail_sequence FROM gv$archive_dest gvad, gv$instance gvi WHERE gvad.inst_id = gvi.inst_id AND destination is NOT NULL ORDER BY thread#, dest_id;

ON STANDBY DATABASE
---------------------------------------------

SQL> select thread#, max(sequence#) "Last Standby Seq Received" from gv$archived_log val, v$database vdb where val.resetlogs_change# = vdb.resetlogs_change# group by thread# order by 1;


SQL>  select thread#, max(sequence#) "Last Standby Seq Applied" from gv$archived_log val, v$database vdb where val.resetlogs_change# = vdb.resetlogs_change# and val.applied in ('YES','IN-MEMORY') group by thread# order by 1;

SQL> select PROCESS,STATUS,THREAD#,SEQUENCE#,BLOCK#,BLOCKS from gv$managed_standby;
`;
}
function active_duplicate_standby() {
  console.log("Starting instructions for active duplicate");
  activeDiv.style.display = "none";
  bkpDiv.style.display = "none";
  activestbydiv.style.display = "block";
  document.getElementById("srl_ad_stby").value = add_srl().join("");
  if (omf_yes.checked) {
    document.getElementById("pfile_ad_stby").value =
      create_omf_pfile().join("");
  } else {
    document.getElementById("pfile_ad_stby").value = create_pfile().join("");
  }
  document.getElementById("listener_ad_stby").value =
    create_listener().join("");
  document.getElementById("tns_ad_stby").value = create_tns().join("");
  document.getElementById("pwdfile_ad_stby").value = create_pwdfile().join("");
  document.getElementById("startup_nomount_ad_stby").value = startup_nomount();
  document.getElementById("rman_connectivity_ad_stby").value =
    verify_rman_connectivity();
  document.getElementById("duplicate_cmd_ad_stby").value =
    create_duplicate_cmd().join("");
  document.getElementById("run_active_duplicate_ad_stby").value =
    run_active_duplicate().join("");
  document.getElementById("monitor_active_duplicate_ad_stby").value =
    monitor_duplicate();
  document.getElementById("broker_active_duplicate_ad_stby").value =
    configure_broker();
  document.getElementById("verify_active_duplicate_ad_stby").value =
    verify_dg_config();
}
function is_until() {
  let set_until = [];
  if (set_until_time.checked) {
    // console.log(until_time);
    let tmp = until_time.replace("T", " ");
    // console.log();
    set_until.push(` UNTIL TIME "to_date('${tmp}','RRRR-MM-DD HH24:MI')"`);
  }
  if (set_until_scn.checked) {
    set_until.push(` UNTIL SCN ${until_scn}`);
  }
  if (set_until_logseq.checked) {
    set_until.push(` UNTIL SEQUENCE ${until_log}`);
  }
  return set_until;
}
function create_ubkploc_duplicate() {
  duplicate_cmd_ubkploc = [
    `Create a file: rman_duplicate.cmd and enter the below:\n`,
  ];
  duplicate_cmd_ubkploc.push(`connect auxiliary /\n`);
  duplicate_cmd_ubkploc.push(`set echo on;\n`);
  duplicate_cmd_ubkploc.push(`run {\n`);
  if (setnewname_yes.checked && omf_no.checked && nofilename_no.checked) {
    console.log("WIP");
    duplicate_cmd_ubkploc.push(
      `set newname for database to '${standby_df_path_name}/%b';\n`
    );
    duplicate_cmd_ubkploc.push(`DUPLICATE DATABASE TO ${standby_db_name}\n`);
    //check if set_until_time is checked
    duplicate_cmd_ubkploc.push(is_until());
    duplicate_cmd_ubkploc.push(`\nSPFILE\n`);
    duplicate_cmd_ubkploc.push(get_controlfile());
    duplicate_cmd_ubkploc.push(
      `SET DB_CREATE_ONLINE_DEST_1='${standby_lf_path_name}'\n`
    );
    duplicate_cmd_ubkploc.push(
      `BACKUP LOCATION '<replace this with the path where backups were copied>;'\n`
    );
    duplicate_cmd_ubkploc.push(`}\n`);
    return duplicate_cmd_ubkploc;
  }
  if (omf_yes.checked && nofilename_no.checked) {
    duplicate_cmd_ubkploc.push(`set newname for database to new;\n`);
    duplicate_cmd_ubkploc.push(`DUPLICATE DATABASE TO ${standby_db_name}\n`);
    //check if set_until_time is checked
    duplicate_cmd_ubkploc.push(is_until());
    duplicate_cmd_ubkploc.push(`\nSPFILE\n`);
    duplicate_cmd_ubkploc.push(get_controlfile());
    duplicate_cmd_ubkploc.push(
      `SET DB_CREATE_FILE_DEST='${standby_df_path_name}'\n`
    );
    duplicate_cmd_ubkploc.push(
      `SET DB_CREATE_ONLINE_DEST_1='${standby_lf_path_name}'\n`
    );
    duplicate_cmd_ubkploc.push(
      `BACKUP LOCATION '<replace this with the path where backups were copied>;'\n`
    );
    duplicate_cmd_ubkploc.push(`}\n`);
    return duplicate_cmd_ubkploc;
  }

  if (nofilename_yes.checked) {
    duplicate_cmd_ubkploc.push(`DUPLICATE DATABASE TO ${standby_db_name}\n`);
    //check if set_until_time is checked
    duplicate_cmd_ubkploc.push(is_until());
    duplicate_cmd_ubkploc.push(`\nSPFILE\n`);
    duplicate_cmd_ubkploc.push(get_controlfile());
    duplicate_cmd_ubkploc.push(
      `BACKUP LOCATION '<replace this with the path where backups were copied>'\n`
    );
    duplicate_cmd_ubkploc.push("NOFILENAMECHECK;\n");
    duplicate_cmd_ubkploc.push(`}\n`);
    return duplicate_cmd_ubkploc;
  }
  if (omf_no.checked && setnewname_no.checked && nofilename_no.checked) {
    duplicate_cmd_ubkploc.push(`DUPLICATE DATABASE TO ${standby_db_name}\n`);
    //check if set_until_time is checked
    duplicate_cmd_ubkploc.push(is_until());
    duplicate_cmd_ubkploc.push(`\nSPFILE\n`);
    duplicate_cmd_ubkploc.push(get_controlfile());
    // console.log("Calling convert");
    duplicate_cmd_ubkploc.push(convert_parameters());
    duplicate_cmd_ubkploc.push(
      `BACKUP LOCATION '<replace this with the path where backups were copied>;'\n`
    );
    duplicate_cmd_ubkploc.push(`}\n`);
    return duplicate_cmd_ubkploc;
  }
}
function using_backup_location() {
  if (set_until_logseq.checked || set_until_scn.checked) {
    show_error_meesage(
      "You can select only until time when using backup location"
    );
  }
  console.log("using backup location starting .....");
  document.getElementById("bkp_primary_db_ubkploc").value = verify_backup();
  document.getElementById(
    "move_backup_ubkploc"
  ).value = `If the duplicate is going to happen on different server, move the backup pieces to a new server using commands like ftp,scp etc.
    If you are using tape, ensure your media manager is configured on the auxiliary server so it is able to restore the backups from tape`;
  // document.getElementById("copy_pwd_file_ubkploc").value=create_pwdfile().join("")
  if (omf_yes.checked) {
    document.getElementById("create_pfile_ubkploc").value =
      create_omf_pfile().join("");
  } else {
    document.getElementById("create_pfile_ubkploc").value =
      create_pfile().join("");
  }
  document.getElementById("startup_nomount_ubkploc").value = startup_nomount();
  document.getElementById("duplicate_cmd_ubkploc").value =
    create_ubkploc_duplicate().join("");
  document.getElementById(
    "run_ubkploc"
  ).value = `rman log=/tmp/rman_duplicate.log\nRMAN>@rman_duplicate.cmd\n`;
  document.getElementById("monitor_ubkploc").value = monitor_duplicate();
  using_nocatalog_notarget.style.display = "";
}
function create_ucatnotar_duplicate() {
  duplicate_cmd_ucatnotar = [
    `Create a file: rman_duplicate.cmd and enter the below:\n`,
  ];
  duplicate_cmd_ucatnotar.push(
    `connect auxiliary / catalog <catalog schema>/<password>@<catalog service>\n`
  );
  duplicate_cmd_ucatnotar.push(`set echo on;\n`);
  duplicate_cmd_ucatnotar.push(`run {\n`);
  if (disk.checked) {
    duplicate_cmd_ucatnotar.push(`allocate auxiliary channel ch1 type disk;\n`);
  } else {
    duplicate_cmd_ucatnotar.push(
      `allocate auxiliary channel sb1 type sbt params <provide tape parameters>\n`
    );
  }
  duplicate_cmd_ucatnotar.push(
    `// you can allocate multiple channles <please remove this line>\n`
  );

  if (nofilename_yes.checked) {
    duplicate_cmd_ucatnotar.push(
      `DUPLICATE DATABASE ${primary_db_name} <dbid 1234 is optional> to ${standby_db_name}\n`
    );
    duplicate_cmd_ucatnotar.push(is_until());
    duplicate_cmd_ucatnotar.push(`\nSPFILE\n`);
    duplicate_cmd_ucatnotar.push(
      `set CONTROL_FILES='${standby_cf_path_name}'\n`
    );
    duplicate_cmd_ucatnotar.push("NOFILENAMECHECK;\n");
    duplicate_cmd_ucatnotar.push(`}\n`);
    return duplicate_cmd_ucatnotar;
  }
  if (setnewname_yes.checked && nofilename_no.checked && omf_no.checked) {
    duplicate_cmd_ucatnotar.push(
      `set newname for database to '${standby_df_path_name}/%b';\n`
    );
    duplicate_cmd_ucatnotar.push(
      `DUPLICATE DATABASE ${primary_db_name} <dbid 1234 is optional> to ${standby_db_name}\n`
    );
    duplicate_cmd_ucatnotar.push(is_until());
    duplicate_cmd_ucatnotar.push(`\nSPFILE\n`);
    duplicate_cmd_ucatnotar.push(
      `set CONTROL_FILES='${standby_cf_path_name};'\n`
    );
    duplicate_cmd_ucatnotar.push(`}\n`);
    return duplicate_cmd_ucatnotar;
  }
  if (omf_yes.checked && nofilename_no.checked) {
    duplicate_cmd_ucatnotar.push(`set newname for database to new;\n`);
    duplicate_cmd_ucatnotar.push(
      `DUPLICATE DATABASE ${primary_db_name} <dbid 1234 is optional> to ${standby_db_name}\n`
    );
    duplicate_cmd_ucatnotar.push(is_until());
    duplicate_cmd_ucatnotar.push(`\nSPFILE\n`);
    duplicate_cmd_ucatnotar.push(
      `set CONTROL_FILES='${standby_cf_path_name}'\n`
    );
    duplicate_cmd_ucatnotar.push(
      `set db_create_file_dest='${standby_df_path_name}'\nset DB_CREATE_ONLINE_LOG_DEST_1='${standby_lf_path_name}';\n`
    );
    duplicate_cmd_ucatnotar.push(`\n}`);
    return duplicate_cmd_ucatnotar;
  }
  duplicate_cmd_ucatnotar.push(
    `DUPLICATE DATABASE ${primary_db_name} <dbid 1234 is optional> to ${standby_db_name}\n`
  );
  duplicate_cmd_ucatnotar.push(is_until());
  duplicate_cmd_ucatnotar.push(`\nSPFILE\n`);
  duplicate_cmd_ucatnotar.push(`set CONTROL_FILES='${standby_cf_path_name}'\n`);
  duplicate_cmd_ucatnotar.push(convert_parameters());
  duplicate_cmd_ucatnotar.push(`\n;}`);
  return duplicate_cmd_ucatnotar;
}

function targetless_with_catalog() {
  // console.log("Coming soon - Targetless with catalog");
  document.getElementById("bkp_primary_db_ucatnotar").value = verify_backup();
  if (disk.checked) {
    document.getElementById(
      "move_backup_ucatnotar"
    ).value = `move the backups from the source server to the destination server in exactly the same location where it was created on the source server.`;
  } else {
    document.getElementById(
      "move_backup_ucatnotar"
    ).value = `You can skip this step. This is only applicable for disk backups`;
  }
  if (omf_yes.checked) {
    document.getElementById("create_pfile_ucatnotar").value =
      create_pfile().join("");
  } else {
    document.getElementById("create_pfile_ucatnotar").value =
      create_pfile().join("");
  }
  document.getElementById("startup_nomount_ucatnotar").value =
    startup_nomount();
  document.getElementById("duplicate_cmd_ucatnotar").value =
    create_ucatnotar_duplicate().join("");
  document.getElementById(
    "run_ucatnotar"
  ).value = `rman log=/tmp/rman_duplicate.log\nRMAN>@rman_duplicate.cmd\n`;
  document.getElementById("monitor_ucatnotar").value = monitor_duplicate();
  using_catalog_notarget.style.display = "";
}
function create_using_target_bkp_duplicate() {
  duplicate_cmd_usingtar = [
    `Create a file: rman_duplicate.cmd and enter the below:\n`,
  ];
  if (catalog_yes.checked) {
    duplicate_cmd_usingtar.push(`connect target sys/<pwd>@<target>\n`);
    duplicate_cmd_usingtar.push(
      `connect catalog <catalog schema>/<password>@<catalog service>\n`
    );
    duplicate_cmd_usingtar.push(`connect auxiliary /\n`);
  } else {
    duplicate_cmd_usingtar.push(`connect target sys/<pwd>@<target>\n`);
    duplicate_cmd_usingtar.push(`connect auxiliary /\n`);
  }
  duplicate_cmd_usingtar.push(`set echo on;\n`);
  duplicate_cmd_usingtar.push(`run {\n`);
  if (disk.checked) {
    duplicate_cmd_usingtar.push(`allocate channel ch1 type disk;\n`);
    duplicate_cmd_usingtar.push(`allocate auxiliary channel ch2 type disk;\n`);
  } else {
    duplicate_cmd_usingtar.push(`allocate channel sb1 type disk;\n`);
    duplicate_cmd_usingtar.push(
      `allocate auxiliary channel sb2 type sbt params <provide tape parameters>\n`
    );
  }
  duplicate_cmd_usingtar.push(
    `// you can allocate multiple auxiliary channels <please remove this line>\n`
  );

  if (nofilename_yes.checked) {
    duplicate_cmd_usingtar.push(
      `DUPLICATE TARGET DATABASE ${primary_db_name} to ${standby_db_name}\n`
    );
    duplicate_cmd_usingtar.push(is_until());
    duplicate_cmd_usingtar.push(`\nSPFILE\n`);
    duplicate_cmd_usingtar.push(
      `set CONTROL_FILES='${standby_cf_path_name}'\n`
    );
    duplicate_cmd_usingtar.push("NOFILENAMECHECK;\n");
    duplicate_cmd_usingtar.push(`}\n`);
    return duplicate_cmd_usingtar;
  }
  if (setnewname_yes.checked && omf_no.checked && nofilename_no.checked) {
    duplicate_cmd_usingtar.push(
      `set newname for database to '${standby_df_path_name}/%b';\n`
    );
    duplicate_cmd_usingtar.push(
      `DUPLICATE TARGET DATABASE ${primary_db_name} <dbid 1234 is optional> to ${standby_db_name}\n`
    );
    duplicate_cmd_usingtar.push(is_until());
    duplicate_cmd_usingtar.push(`\nSPFILE\n`);
    duplicate_cmd_usingtar.push(
      `set CONTROL_FILES='${standby_cf_path_name};'\n`
    );
    duplicate_cmd_usingtar.push(`}\n`);
    return duplicate_cmd_usingtar;
  }
  if (omf_no.checked && nofilename_no.checked && setnewname_no.checked) {
    duplicate_cmd_usingtar.push(
      `DUPLICATE TARGET DATABASE ${primary_db_name} <dbid 1234 is optional> to ${standby_db_name}\n`
    );
    duplicate_cmd_usingtar.push(is_until());
    duplicate_cmd_usingtar.push(`\nSPFILE\n`);
    duplicate_cmd_usingtar.push(
      `set CONTROL_FILES='${standby_cf_path_name}'\n`
    );
    duplicate_cmd_usingtar.push(convert_parameters());
    duplicate_cmd_usingtar.push(`\n;}`);
    return duplicate_cmd_usingtar;
  }
  if (omf_yes.checked && nofilename_no.checked) {
    duplicate_cmd_usingtar.push(`set newname for database to new;\n`);
    duplicate_cmd_usingtar.push(
      `DUPLICATE TARGET DATABASE ${primary_db_name} <dbid 1234 is optional> to ${standby_db_name}\n`
    );
    duplicate_cmd_usingtar.push(is_until());
    duplicate_cmd_usingtar.push(`\nSPFILE\n`);
    duplicate_cmd_usingtar.push(
      `set CONTROL_FILES='${standby_cf_path_name}'\n`
    );
    duplicate_cmd_usingtar.push(
      `set db_create_file_dest='${standby_df_path_name}'\nset DB_CREATE_ONLINE_LOG_DEST_1='${standby_lf_path_name}';\n`
    );
    duplicate_cmd_usingtar.push(`\n}`);
    return duplicate_cmd_usingtar;
  }
}

function using_target_bkp_duplicate() {
  document.getElementById("bkp_primary_db_usingtar").value = verify_backup();
  if (disk.checked) {
    document.getElementById(
      "move_backup_usingtar"
    ).value = `move the backups from the source server to the destination server in exactly the same location where it was created on the source server.`;
  } else {
    document.getElementById(
      "move_backup_usingtar"
    ).value = `You can skip this step. This is only applicable for disk backups`;
  }
  document.getElementById("copy_pwd_file_usingtar").value =
    create_pwdfile().join("");
  if (omf_yes.checked) {
    document.getElementById("create_pfile_usingtar").value =
      create_pfile().join("");
  } else {
    document.getElementById("create_pfile_usingtar").value =
      create_pfile().join("");
  }

  document.getElementById("listener_usingtar").value =
    create_listener().join("");
  document.getElementById("tns_usingtar").value = create_tns().join("");
  document.getElementById("rman_connectivity_usingtar").value =
    verify_rman_connectivity();
  document.getElementById("startup_nomount_usingtar").value = startup_nomount();
  document.getElementById("duplicate_cmd_usingtar").value =
    create_using_target_bkp_duplicate().join("");
  document.getElementById(
    "run_usingtar"
  ).value = `rman log=/tmp/rman_duplicate.log\nRMAN>@rman_duplicate.cmd\n`;
  document.getElementById("monitor_usingtar").value = monitor_duplicate();
  using_target.style.display = "";
}
function create_stby_using_bkp_duplicate() {
  duplicate_cmd_usingstby = [
    `Create a file: rman_duplicate.cmd and enter the below:\n`,
  ];
  if (catalog_yes.checked) {
    if (target_yes.checked) {
      duplicate_cmd_usingstby.push(
        `connect target sys/<pwd>@<target> \nconnect catalog <catalog schema>/<password>@<catalog service>\nconnect auxiliary /\n`
      );
    } else {
      duplicate_cmd_usingstby.push(
        `connect catalog <catalog schema>/<password>@<catalog service>\nconnect auxiliary /\n`
      );
    }
  } else {
    if (target_yes.checked) {
      duplicate_cmd_usingstby.push(
        `connect target sys/<pwd>@<target>\nconnect auxiliary /\n`
      );
    } else {
      duplicate_cmd_usingstby.push(`connect auxiliary /\n`);
    }
  }
  duplicate_cmd_usingstby.push(`set echo on;\n`);
  duplicate_cmd_usingstby.push(`run {\n`);
  duplicate_cmd_usingstby.push(`allocate channel ch1 type disk;\n`);
  if (disk.checked) {
    duplicate_cmd_usingstby.push(`allocate auxiliary channel ch1 type disk;\n`);
  } else {
    duplicate_cmd_usingstby.push(
      `allocate auxiliary channel sb1 type sbt params <provide tape parameters>\n`
    );
  }
  if (nofilename_yes.checked) {
    duplicate_cmd_usingstby.push(
      `// you can allocate multiple channles <please remove this line>\n`
    );
    duplicate_cmd_usingstby.push(
      `duplicate target database for standby nofilenamecheck dorecover;\n`
    );
    duplicate_cmd_usingstby.push(is_until());
    duplicate_cmd_usingstby.push(`\nSPFILE\n`);
    duplicate_cmd_usingstby.push(
      `set CONTTROL_FILES='${standby_cf_path_name}'`
    );
    duplicate_cmd_usingstby.push("NOFILENAMECHECK;\n");
    duplicate_cmd_usingstby.push(`}\n`);
    return duplicate_cmd_usingstby;
  }
  if (setnewname_yes.checked && omf_no.checked && nofilename_no.checked) {
    duplicate_cmd_usingstby.push(
      `set newname for database to '${standby_df_path_name}/%b';\n`
    );
    duplicate_cmd_usingstby.push(
      `// you can allocate multiple channles <please remove this line>\n`
    );
    duplicate_cmd_usingstby.push(
      `duplicate target database for standby nofilenamecheck dorecover;\n`
    );
    duplicate_cmd_usingstby.push(is_until());
    duplicate_cmd_usingstby.push(`\nSPFILE\n`);
    duplicate_cmd_usingstby.push(
      `set CONTTROL_FILES='${standby_cf_path_name}'`
    );
    duplicate_cmd_usingstby.push(`}\n`);
    return duplicate_cmd_usingstby;
  }
  if (omf_yes.checked && nofilename_no.checked) {
    duplicate_cmd_usingstby.push(`set newname for database to new;\n`);
    duplicate_cmd_usingstby.push(
      `// you can allocate multiple channles <please remove this line>\n`
    );
    duplicate_cmd_usingstby.push(
      `duplicate target database for standby nofilenamecheck dorecover;\n`
    );
    duplicate_cmd_usingstby.push(is_until());
    duplicate_cmd_usingstby.push(`\nSPFILE\n`);
    duplicate_cmd_usingstby.push(
      `set CONTTROL_FILES='${standby_cf_path_name}'`
    );
    duplicate_cmd_usingstby.push(
      `set db_create_file_dest='${standby_df_path_name}'\nset DB_CREATE_ONLINE_LOG_DEST_1='${standby_lf_path_name}';\n`
    );
    duplicate_cmd_usingstby.push(`}\n`);
    return duplicate_cmd_usingstby;
  }
  duplicate_cmd_usingstby.push(
    `// you can allocate multiple channles <please remove this line>\n`
  );
  duplicate_cmd_usingstby.push(
    `duplicate target database for standby nofilenamecheck dorecover;\n`
  );
  duplicate_cmd_usingstby.push(is_until());
  duplicate_cmd_usingstby.push(`\nSPFILE\n`);
  duplicate_cmd_usingstby.push(
    `set CONTTROL_FILES='${standby_cf_path_name}'\n`
  );
  duplicate_cmd_usingstby.push(convert_parameters());
  duplicate_cmd_usingstby.push(`\n;}`);
  return duplicate_cmd_usingstby;
}

function create_standby_using_bkp_func() {
  console.log("Creating standby");
  document.getElementById("srl_bkp_stby").value = add_srl().join("");
  document.getElementById(
    "bkp_primary_stby"
  ).value = `Make sure you have full backups along with archive logs RMAN> list backup;\nIf not take a backup of spfile and full backup along with archive logs`;
  if (disk.checked) {
    document.getElementById(
      "move_backup_stby"
    ).value = `move the backups from the source server to the destination server in exactly the same location where it was created on the source server.`;
  } else {
    document.getElementById(
      "move_backup_stby"
    ).value = `You can skip this step. This is only applicable for disk backups`;
  }
  document.getElementById("copy_pwd_file_stby").value =
    create_pwdfile().join("");
  if (omf_yes.checked) {
    document.getElementById("create_pfile_stby").value =
      create_pfile().join("");
  } else {
    document.getElementById("create_pfile_stby").value =
      create_pfile().join("");
  }

  document.getElementById("listener_stby").value = create_listener().join("");
  document.getElementById("tns_stby").value = create_tns().join("");
  document.getElementById("rman_connectivity_stby").value =
    verify_rman_connectivity();
  document.getElementById("startup_nomount_stby").value = startup_nomount();
  document.getElementById("duplicate_cmd_stby").value =
    create_stby_using_bkp_duplicate().join("");
  document.getElementById(
    "run_stby"
  ).value = `rman log=/tmp/rman_duplicate.log\nRMAN>@rman_duplicate.cmd\n`;
  document.getElementById("monitor_stby").value = monitor_duplicate();
  document.getElementById("broker_active_duplicate_bkp_stby").value =
    configure_broker();
  document.getElementById("verify_active_duplicate_bkp_stby").value =
    verify_dg_config();
  create_standby_using_bkp.style.display = "";
}

function show_error_meesage(msg) {
  alert(msg);
  error_text.value = msg;
  bkpDiv.style.display = "none";
  error_text.style.display = "";
}
function backup_duplicate() {
  //Throw error is no catalog/target/tape
  if (target_no.checked && catalog_no.checked && tape.checked) {
    // console.log("You cannot use backup based duplicate")
    // console.log(error_text);
    show_error_meesage("You cannot use backup based duplicate");
  }
  //if no target no catalog//call using_bkp_location
  if (target_no.checked && catalog_no.checked && disk.checked) {
    using_catalog_notarget.style.display = "none";
    using_target.style.display = "none";
    error_text.style.display = "none";
    create_standby_using_bkp.style.display = "none";
    using_backup_location();
  }
  //if not target but catalog -- check tape or disk in allocate channel -- call notargetwithcatalog
  if (target_no.checked && catalog_yes.checked) {
    using_target.style.display = "none";
    using_nocatalog_notarget.style.display = "none";
    error_text.style.display = "none";
    create_standby_using_bkp.style.display = "none";
    targetless_with_catalog();
  }
  //if target -- check tape or disk in allocate channel -- create sqlnet -- call target_based_backup
  if (target_yes.checked) {
    //create duplicate script
    using_nocatalog_notarget.style.display = "none";
    using_catalog_notarget.style.display = "none";
    error_text.style.display = "none";
    create_standby_using_bkp.style.display = "none";
    using_target_bkp_duplicate();
  }
  if (isBackupDuplicate.checked && isStandby.checked) {
    using_nocatalog_notarget.style.display = "none";
    using_catalog_notarget.style.display = "none";
    error_text.style.display = "none";
    using_target.style.display = "none";
    create_standby_using_bkp_func();
  }
}

function gen_instruction() {
  primary_db_name = document.getElementById("db_p_name").value; //db_name
  standby_db_name = document.getElementById("db_s_name").value;
  primary_db_unique_name = document.getElementById("db_pu_name").value; //db_unique
  standby_db_unique_name = document.getElementById("db_su_name").value;
  primary_host_name = document.getElementById("host_p_name").value; //host
  standby_host_name = document.getElementById("host_s_name").value;
  primary_port_number = document.getElementById("port_p_name").value; //port
  standby_port_number = document.getElementById("port_s_name").value;
  primary_df_path_name = document.getElementById("df_p_name").value;
  standby_df_path_name = document.getElementById("df_s_name").value;
  primary_lf_path_name = document.getElementById("lf_p_name").value;
  standby_lf_path_name = document.getElementById("lf_s_name").value;
  standby_cf_path_name = document.getElementById("cf_s_name").value;
  //  primary_version=primary_version_options.options[primary_version_options.selectedIndex].value
  //  standby_version=standby_version_options.options[standby_version_options.selectedIndex].value
  //  console.log(primary_version);
  //  isCloneDB=document.getElementById("clone")
  //  isStandby=document.getElementById("standby")
  //  //check if path has commas and split into array
  primary_df_path_name.includes(",")
    ? (primary_df_path_name = primary_df_path_name.split(","))
    : (primary_df_path_name = document.getElementById("df_p_name").value); //data file path
  standby_df_path_name.includes(",")
    ? (standby_df_path_name = standby_df_path_name.split(","))
    : (standby_df_path_name = document.getElementById("df_s_name").value);
  primary_lf_path_name.includes(",")
    ? (primary_lf_path_name = primary_lf_path_name.split(","))
    : (primary_lf_path_name = document.getElementById("lf_p_name").value); //log file path
  standby_lf_path_name.includes(",")
    ? (standby_lf_path_name = standby_lf_path_name.split(","))
    : (standby_lf_path_name = document.getElementById("lf_s_name").value);
  standby_cf_path_name.includes(",")
    ? (standby_cf_path_name = standby_cf_path_name.split(","))
    : (standby_cf_path_name = document.getElementById("cf_s_name").value);
  //  primary_OH_name=document.getElementById("oh_p_name").value // ORACLE_HOME
  //  standby_OH_name=document.getElementById("oh_s_name").value // ORACLE_HOME
  until_time = document.getElementById("until_time").value;
  until_scn = document.getElementById("until_scn").value;
  until_log = document.getElementById("until_log").value;

  if (isActiveDuplicate.checked && isCloneDB.checked) {
    error_text.style.display = "none";
    active_duplicate();
  }

  if (isActiveDuplicate.checked && isStandby.checked) {
    error_text.style.display = "none";
    active_duplicate_standby();
  }

  if (isBackupDuplicate.checked) {
    activeDiv.style.display = "none";
    activestbydiv.style.display = "none";
    bkpDiv.style.display = "";
    //backup duplicate
    backup_duplicate();
  }
}

//Create listener
//create tns
//create pwd_file
//create duplicate_cmd
