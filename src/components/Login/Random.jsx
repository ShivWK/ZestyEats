<div className="w-[80%] h-auto mt-7">
        <button className="cursor-pointer mb-4" onClick={handleClose}>
          <i className="ri-close-large-fill text-xl"></i>
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h2>{member ? "Login" : "Sign up"}</h2>
            <p className="font-semibold">
              or{" "}
              <button
                className="text-primary cursor-pointer"
                onClick={handleSwitch}
              >
                {member ? "create an account" : "login to your account"}
              </button>
            </p>
            <hr className="w-8 border-t-2 font-bold mt-6" />
          </div>
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
            height="110px"
            width="110px"
            alt="Profile_dummy_image"
          />
        </div>
        {member && (
          <Form
            guestLogin={true}
            handleClick={handleSignIn}
            handleGuestLogin={handleGuestLogin}
            buttonText="LOGIN"
            signingStatement={"By clicking on Login"}
          >
            <EnteryDiv
              handleDivClick={handleInputClick}
              hasValue={hasValue}
              inputRef={inputRef}
              handleInput={handleInput}
              handleFocus={handleFocus}
              placeholder="Phone number"
              fallbackPlacehoder="Enter your phone number"
              focus={phone}
            />
          </Form>
        )}
        {!member && (
          <Form
            guestLogin={false}
            handleClick={handleSignUp}
            buttonText="CONTINUE"
            signingStatement={"By creating an account"}
          >
            {/* <EntryDiv /> */}
          </Form>
        )}
        
        <p
          className="absolute top-[93%] left-[50%] transform -translate-1/2 text-center text-lg font-semibold text-primary"
          style={{ fontStyle: "italic" }}
        >
          Developed By Shivendra
        </p>
      </div>