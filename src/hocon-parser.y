%start HOCONText

%% /* HOCON grammar : https://github.com/typesafehub/config/blob/master/HOCON.md */

HOCONText
    : HOCONDocument EOF
        {return $1;}
    ;

HOCONDocument
	: HOCONArray
	| HOCONObject
	| HOCONField
		{ $$ = {}; $$[$1[0]] = $1[1] }
	;
	
HOCONObject
	: '{' '}'
		{ $$ = {}; }
	| '{' HOCONFieldList '}'
		{ $$ = $2; }
	;

HOCONField
	: HOCONKey ':' HOCONValue
		{ $$ = [ $1, $3 ] }
	| HOCONKey '=' HOCONValue
		{ $$ = [ $1, $3 ] }
	| HOCONKey HOCONObject
		{ $$ = [ $1, $2 ] }
	| HOCONKey HOCONArray
		{ $$ = [ $1, $2 ] }
	;

HOCONFieldList
	: HOCONField
		{ $$ = {}; $$[$1[0]] = $1[1]; }
	| HOCONFieldList ',' HOCONField
		{ $$ = $1; 
			if($3[0] in $$ && typeof $$[$3[0]] === 'object') {
				if(typeof $3[1] === 'object') {
					$3[1].merge($$[$3[0]]);
				}	
			} 
			$$[$3[0]] = $3[1]; 
		}
	;

HOCONArray
	: '[' ']'
		{ $$ = []; }
	| '[' HOCONElementList ']'
		{ $$ = $2; }
	;

HOCONElementList
	: HOCONValue
		{ $$ = [$1]; }
	| HOCONElementList ',' 
		{ $$ = $1; }
	| HOCONElementList ',' HOCONValue
		{ $$ = $1; $1.push($3); }
	;

HOCONKey
	: STRING
		{ $$ = $1; }
	| UNSTRING
		{ $$ = $1; }
	;
	
HOCONValue
	: HOCONSimpleValue
	| HOCONObject
	| HOCONArray
	;

HOCONSimpleValue
	: HOCONNullLiteral
	| HOCONBooleanLiteral
	| NUMBER
	| STRING
	;

HOCONBooleanLiteral
	: TRUE
		{ $$ = true; }
	| FALSE
		{ $$ = false; }
	;

HOCONNullLiteral
	: NULL
		{ $$ = null; }
	;
