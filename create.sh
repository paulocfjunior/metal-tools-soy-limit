#! /bin/bash

# HOW_MUCH_FILES=82 # The process resolves correctly
# HOW_MUCH_FILES=83 # The process exits without resolution

create_files_on_path() {
  QUANTITY=$1
  DESTINATION=$2

  mkdir -p $DESTINATION

  for i in `seq $QUANTITY $END`; do
  echo -e "{namespace T$i}\n/**\n*/\n{template .render}\n$i\n{/template}" > $DESTINATION/$i.soy
  done
}

create_files_on_path $HOW_MUCH_FILES ./src/a/b